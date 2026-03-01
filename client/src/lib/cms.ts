import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export type ClientType = "B2B" | "B2G";

export interface PortableTextSpan {
  _type?: string;
  text?: string;
}

export interface PortableTextBlock {
  _type?: string;
  children?: PortableTextSpan[];
}

export interface CmsBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: PortableTextBlock[];
  category: string;
  author: string;
  language: Language | string;
  published: boolean;
  featuredImageUrl?: string;
  imageAlt?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface CmsService {
  _id: string;
  name: string;
  serviceKey: string;
  icon?: string;
  language: Language | string;
  clientType: ClientType;
  description: PortableTextBlock[];
  features: string[];
  order: number;
  active: boolean;
}

export interface CmsCaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  language: Language | string;
  description: PortableTextBlock[];
  challenge: string;
  solution: string;
  results: string[];
  order: number;
  published: boolean;
}

export interface CmsSiteSettings {
  _id: string;
  language: Language | string;
  siteName: string;
  logoText: string;
  heroImageUrl?: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  serviceNavItems?: Array<{serviceKey: string; icon?: string}>;
  socialLinks?: Array<{label?: string; url?: string; icon?: string}>;
}

export type CmsSectionType =
  | "heroSection"
  | "trustStatsSection"
  | "servicesIntroSection"
  | "servicesListSection"
  | "caseStudiesSection"
  | "blogPreviewSection"
  | "contactHeaderSection"
  | "contactMethodsSection"
  | "contactFeaturesSection"
  | "contactFormSection"
  | "ctaBandSection"
  | "blogListControlsSection"
  | "blogPostMetaSection"
  | "navbarSection"
  | "footerSection"
  | "emptyStateSection"
  | "loadingStateSection"
  | "notFoundStateSection";

export interface CmsSectionBase {
  _type: CmsSectionType;
  sectionId: string;
  enabled?: boolean;
  order?: number;
}

export type CmsPageSection = CmsSectionBase & Record<string, unknown>;

export interface CmsPageContent {
  _id: string;
  pageKey: "home" | "services" | "contact" | "blog" | "blogPost" | "notFound" | "layout" | string;
  language: Language | string;
  clientType?: ClientType | string;
  sections: CmsPageSection[];
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const data = await response.json();
  return sanitizeCmsData(data) as T;
}

const serviceDisplayNames: Record<Language, Record<string, string>> = {
  pl: {
    physicalsecurity: "Testy bezpieczeństwa fizycznego",
    phishing: "Testy phishingowe",
    cyberawareness: "Szkolenia cyber awareness",
    osint: "OSINT - wywiad jawnoźródłowy",
    forensics: "Informatyka śledcza",
    datarecovery: "Odzyskiwanie danych",
    translations: "Usługi tłumaczeniowe",
  },
  en: {
    physicalsecurity: "Physical security tests",
    phishing: "Phishing tests",
    cyberawareness: "Cyber awareness training",
    osint: "OSINT - open source intelligence",
    forensics: "Digital forensics",
    datarecovery: "Data recovery",
    translations: "Translation services",
  },
};

const serviceCatalogByClientType: Record<ClientType, string[]> = {
  B2B: ["physicalsecurity", "phishing", "cyberawareness", "osint"],
  B2G: ["forensics", "datarecovery", "translations"],
};

function buildPortableText(text: string): PortableTextBlock[] {
  return [{ _type: "block", children: [{ _type: "span", text }] }];
}

function getLocalizedText(language: Language, key: string, fallback: string): string {
  const langDict = translations[language] as Record<string, string> | undefined;
  const plDict = translations.pl as Record<string, string> | undefined;
  return langDict?.[key] || plDict?.[key] || fallback;
}

function ensureExpectedServices(
  services: CmsService[],
  language: Language,
  clientType: ClientType,
): CmsService[] {
  const expectedKeys = serviceCatalogByClientType[clientType];
  const serviceByKey = new Map<string, CmsService>();

  for (const service of services) {
    if (!expectedKeys.includes(service.serviceKey)) {
      continue;
    }
    if (!serviceByKey.has(service.serviceKey)) {
      serviceByKey.set(service.serviceKey, service);
    }
  }

  const result = expectedKeys.map((serviceKey, index) => {
    const existingService = serviceByKey.get(serviceKey);
    if (existingService) {
      return existingService;
    }

    return {
      _id: `fallback-${language}-${clientType}-${serviceKey}`,
      name: serviceDisplayNames[language]?.[serviceKey] || serviceKey,
      serviceKey,
      language,
      clientType,
      description: buildPortableText(
        getLocalizedText(
          language,
          `services.${serviceKey}.description.${clientType.toLowerCase()}`,
          "",
        ),
      ),
      features: [0, 1, 2, 3]
        .map((featureIndex) =>
          getLocalizedText(language, `features.${serviceKey}.${featureIndex}`, ""),
        )
        .filter(Boolean),
      order: index,
      active: true,
    } satisfies CmsService;
  });

  return result;
}

function normalizeCmsText(value: string): string {
  return value
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/\u00a0/g, " ");
}

function sanitizeCmsData(value: unknown): unknown {
  if (typeof value === "string") {
    return normalizeCmsText(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeCmsData(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeCmsData(nestedValue)]),
    );
  }

  return value;
}

export function portableTextToPlainText(blocks: unknown): string {
  if (!blocks) {
    return "";
  }

  if (typeof blocks === "string") {
    return normalizeCmsText(blocks).trim();
  }

  if (!Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block) => {
      const children = (block as PortableTextBlock)?.children;
      if (!Array.isArray(children)) {
        return "";
      }
      return children.map((span) => normalizeCmsText(span?.text || "")).join("");
    })
    .join("\n\n")
    .trim();
}

export function sortSections<T extends CmsPageSection>(sections: T[] = []): T[] {
  return [...sections]
    .filter((section) => section && section.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getSection<T extends CmsPageSection>(
  sections: CmsPageSection[] | undefined,
  type: CmsSectionType,
): T | undefined {
  return sections?.find((section) => section._type === type && section.enabled !== false) as T | undefined;
}

export function getPageContent(
  page: CmsPageContent["pageKey"],
  language: Language,
  clientType?: ClientType,
): Promise<CmsPageContent | null> {
  const clientTypeQuery = clientType ? `&clientType=${clientType}` : "";
  return getJson<CmsPageContent | null>(`/api/cms/page-content?page=${page}&lang=${language}${clientTypeQuery}`);
}

export function getBlogPosts(language: Language): Promise<CmsBlogPost[]> {
  return getJson<CmsBlogPost[]>(`/api/cms/blog?lang=${language}`);
}

export function getBlogPost(slug: string, language: Language): Promise<CmsBlogPost> {
  return getJson<CmsBlogPost>(`/api/cms/blog/${slug}?lang=${language}`);
}

export function getServices(
  language: Language,
  clientType: ClientType,
): Promise<CmsService[]> {
  return getJson<CmsService[]>(
    `/api/cms/services?lang=${language}&clientType=${clientType}`,
  ).then((services) =>
    ensureExpectedServices(services, language, clientType)
      .map((service) => ({
        ...service,
        name: serviceDisplayNames[language]?.[service.serviceKey] || service.name,
      }))
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
  );
}

export function getCaseStudies(language: Language): Promise<CmsCaseStudy[]> {
  return getJson<CmsCaseStudy[]>(`/api/cms/case-studies?lang=${language}`);
}

export function getSiteSettings(language: Language): Promise<CmsSiteSettings> {
  return getJson<CmsSiteSettings>(`/api/cms/site-settings?lang=${language}`);
}

