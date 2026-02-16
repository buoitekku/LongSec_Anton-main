import type { Language } from "@/lib/i18n";

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
  language: Language | string;
  clientType: "B2B" | "B2C";
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

export interface CmsTestimonial {
  _id: string;
  quote: string;
  author: string;
  position: string;
  language: Language | string;
  rating: number;
  featured: boolean;
  order: number;
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
  calendlyUrl?: string;
  serviceNavItems?: Array<{serviceKey: string; icon?: string}>;
  socialLinks?: Array<{label?: string; url?: string; icon?: string}>;
  certifications?: Array<{short?: string; full?: string}>;
}

export interface CmsHomePage {
  _id: string;
  language: Language | string;
  clientType: "B2B" | "B2C" | string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.json();
}

export function portableTextToPlainText(blocks: unknown): string {
  if (!blocks) {
    return "";
  }

  if (typeof blocks === "string") {
    return blocks.trim();
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
      return children.map((span) => span?.text || "").join("");
    })
    .join("\n\n")
    .trim();
}

export function getBlogPosts(language: Language): Promise<CmsBlogPost[]> {
  return getJson<CmsBlogPost[]>(`/api/cms/blog?lang=${language}`);
}

export function getBlogPost(slug: string, language: Language): Promise<CmsBlogPost> {
  return getJson<CmsBlogPost>(`/api/cms/blog/${slug}?lang=${language}`);
}

export function getServices(
  language: Language,
  clientType: "B2B" | "B2C",
): Promise<CmsService[]> {
  return getJson<CmsService[]>(
    `/api/cms/services?lang=${language}&clientType=${clientType}`,
  );
}

export function getCaseStudies(language: Language): Promise<CmsCaseStudy[]> {
  return getJson<CmsCaseStudy[]>(`/api/cms/case-studies?lang=${language}`);
}

export function getTestimonials(language: Language): Promise<CmsTestimonial[]> {
  return getJson<CmsTestimonial[]>(`/api/cms/testimonials?lang=${language}`);
}

export function getSiteSettings(language: Language): Promise<CmsSiteSettings> {
  return getJson<CmsSiteSettings>(`/api/cms/site-settings?lang=${language}`);
}

export function getTranslationMap(language: Language): Promise<Record<string, string>> {
  return getJson<Record<string, string>>(`/api/cms/translations?lang=${language}`);
}

export function getHomePage(
  language: Language,
  clientType: "B2B" | "B2C",
): Promise<CmsHomePage | null> {
  return getJson<CmsHomePage | null>(
    `/api/cms/home-page?lang=${language}&clientType=${clientType}`,
  );
}
