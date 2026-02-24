import {translations} from "../client/src/lib/i18n";
import fs from "node:fs";
import path from "node:path";

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

type Language = "pl" | "en";
type ClientType = "B2B" | "B2G";
type ServiceKey =
  | "physicalsecurity"
  | "phishing"
  | "cyberawareness"
  | "osint"
  | "forensics"
  | "datarecovery"
  | "translations";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "pcuqdu0d";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_VERSION = (process.env.SANITY_API_VERSION || "2025-02-19").replace(/^v/, "");
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const BLOG_API_BASE_URL = process.env.MIGRATION_BLOG_API || "http://localhost:5000";
const MIGRATION_DRY_RUN = (process.env.MIGRATION_DRY_RUN || "true").toLowerCase() !== "false";

const languages: Language[] = ["pl", "en"];
const clientTypes: ClientType[] = ["B2B", "B2G"];

const serviceCatalog: Record<ClientType, ServiceKey[]> = {
  B2B: ["physicalsecurity", "phishing", "cyberawareness", "osint"],
  B2G: ["forensics", "datarecovery", "translations"],
};

const serviceIcons: Record<ServiceKey, string> = {
  physicalsecurity: "🔐",
  phishing: "🎯",
  cyberawareness: "🎓",
  osint: "🔎",
  forensics: "🕵️",
  datarecovery: "💾",
  translations: "🌐",
};

const defaultHeroImageUrl =
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";

const serviceFeatures: Record<ServiceKey, string[]> = {
  physicalsecurity: [
    "features.physicalsecurity.0",
    "features.physicalsecurity.1",
    "features.physicalsecurity.2",
    "features.physicalsecurity.3",
  ],
  phishing: [
    "features.phishing.0",
    "features.phishing.1",
    "features.phishing.2",
    "features.phishing.3",
  ],
  cyberawareness: [
    "features.cyberawareness.0",
    "features.cyberawareness.1",
    "features.cyberawareness.2",
    "features.cyberawareness.3",
  ],
  osint: [
    "features.osint.0",
    "features.osint.1",
    "features.osint.2",
    "features.osint.3",
  ],
  forensics: [
    "features.forensics.0",
    "features.forensics.1",
    "features.forensics.2",
    "features.forensics.3",
  ],
  datarecovery: [
    "features.datarecovery.0",
    "features.datarecovery.1",
    "features.datarecovery.2",
    "features.datarecovery.3",
  ],
  translations: [
    "features.translations.0",
    "features.translations.1",
    "features.translations.2",
    "features.translations.3",
  ],
};

function t(lang: Language, key: string): string {
  return (
    (translations as Record<Language, Record<string, string>>)?.[lang]?.[key] ||
    (translations as Record<Language, Record<string, string>>)?.pl?.[key] ||
    key
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function textToPortableText(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return [{_type: "block", style: "normal", children: [{_type: "span", text: ""}]}];
  }

  return paragraphs.map((paragraph) => ({
    _type: "block",
    style: "normal",
    children: [{_type: "span", text: paragraph}],
  }));
}

function buildHomePageDocs() {
  const docs: any[] = [];
  for (const lang of languages) {
    for (const clientType of clientTypes) {
      docs.push({
        _id: `homePage-${lang}-${clientType}`,
        _type: "homePage",
        language: lang,
        clientType,
        heroBadge: t(lang, "hero.badge"),
        heroTitle: t(lang, clientType === "B2B" ? "hero.title.b2b" : "hero.title.b2g"),
        heroSubtitle: t(lang, clientType === "B2B" ? "hero.subtitle.b2b" : "hero.subtitle.b2g"),
        heroPrimaryCta: t(lang, "hero.cta.consultation"),
        heroSecondaryCta: t(lang, "hero.cta.cases"),
      });
    }
  }
  return docs;
}

function buildI18nDocs() {
  const docs: any[] = [];
  for (const lang of languages) {
    const entries = Object.entries((translations as Record<Language, Record<string, string>>)[lang] || {});
    for (const [key, value] of entries) {
      const idSafeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
      docs.push({
        _id: `i18n-${lang}-${idSafeKey}`,
        _type: "i18nString",
        language: lang,
        key,
        value: String(value),
      });
    }
  }
  return docs;
}

function buildSiteSettingsDocs() {
  const navItems = [
    {serviceKey: "physicalsecurity", icon: serviceIcons.physicalsecurity},
    {serviceKey: "phishing", icon: serviceIcons.phishing},
    {serviceKey: "cyberawareness", icon: serviceIcons.cyberawareness},
    {serviceKey: "osint", icon: serviceIcons.osint},
    {serviceKey: "forensics", icon: serviceIcons.forensics},
    {serviceKey: "datarecovery", icon: serviceIcons.datarecovery},
    {serviceKey: "translations", icon: serviceIcons.translations},
  ];

  return languages.map((lang) => ({
    _id: `siteSettings-${lang}`,
    _type: "siteSettings",
    language: lang,
    siteName: "LongSec",
    logoText: "LongSec",
    heroImageUrl: defaultHeroImageUrl,
    contactPhone: "+48 22 123 4567",
    contactEmail: "kontakt@longsec.pl",
    contactAddress: "ul. Krakowskie Przedmieście 5, 00-068 Warszawa",
    serviceNavItems: navItems,
    socialLinks: [
      {label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin"},
      {label: "Twitter", url: "https://twitter.com", icon: "twitter"},
      {label: "Facebook", url: "https://facebook.com", icon: "facebook"},
      {label: "GitHub", url: "https://github.com", icon: "github"},
    ],
  }));
}

function buildServiceDocs() {
  const docs: any[] = [];
  for (const lang of languages) {
    for (const clientType of clientTypes) {
      serviceCatalog[clientType].forEach((serviceKey, index) => {
        docs.push({
          _id: `service-${lang}-${clientType}-${serviceKey}`,
          _type: "service",
          name: t(lang, `services.${serviceKey}.title`),
          serviceKey,
          icon: serviceIcons[serviceKey],
          language: lang,
          clientType,
          description: textToPortableText(t(lang, `services.${serviceKey}.description.${clientType.toLowerCase()}`)),
          features: serviceFeatures[serviceKey].map((key) => t(lang, key)),
          order: index,
          active: true,
        });
      });
    }
  }
  return docs;
}

function buildCaseStudyDocs() {
  const mapping = [
    {id: 1, category: "cybersecurity"},
    {id: 2, category: "translations"},
    {id: 3, category: "datarecovery"},
  ] as const;

  const docs: any[] = [];
  for (const lang of languages) {
    mapping.forEach(({id, category}, index) => {
      const title = t(lang, `cases.study${id}.title`);
      docs.push({
        _id: `caseStudy-${lang}-${id}`,
        _type: "caseStudy",
        title,
        slug: {_type: "slug", current: slugify(title)},
        category,
        client: t(lang, `cases.study${id}.client`),
        language: lang,
        description: textToPortableText(t(lang, `cases.study${id}.description`)),
        challenge: t(lang, `cases.study${id}.challenge`),
        solution: t(lang, `cases.study${id}.solution`),
        results: [
          t(lang, `cases.study${id}.result1`),
          t(lang, `cases.study${id}.result2`),
          t(lang, `cases.study${id}.result3`),
        ],
        order: index,
        published: true,
      });
    });
  }
  return docs;
}

interface LegacyBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  language: string;
  published: boolean;
  imageAlt?: string | null;
  createdAt?: string;
}

function normalizeCategory(category: string): string {
  const map: Record<string, string> = {
    cybersecurity: "cybersecurity",
    translations: "translations",
    training: "cyberawareness",
    osint: "osint",
    datarecovery: "datarecovery",
    Cyberbezpieczeństwo: "cybersecurity",
    Tłumaczenia: "translations",
    Szkolenia: "cyberawareness",
    "Data Recovery": "datarecovery",
  };
  return map[category] || "cybersecurity";
}

async function buildBlogDocsFromApi() {
  const docs: any[] = [];
  for (const lang of languages) {
    try {
      const response = await fetch(`${BLOG_API_BASE_URL}/api/blog?lang=${lang}`);
      if (!response.ok) {
        console.warn(`[warn] Blog API unavailable for ${lang}: ${response.status}`);
        continue;
      }

      const posts = (await response.json()) as LegacyBlogPost[];
      posts
        .filter((post) => post.published)
        .forEach((post) => {
          docs.push({
            _id: `blogPost-${lang}-${post.id}`,
            _type: "blogPost",
            title: post.title,
            slug: {_type: "slug", current: post.slug || slugify(post.title)},
            excerpt: post.excerpt,
            content: textToPortableText(post.content || ""),
            category: normalizeCategory(post.category),
            author: post.author || "LongSec Team",
            language: lang,
            published: true,
            imageAlt: post.imageAlt || undefined,
            publishedAt: post.createdAt || new Date().toISOString(),
          });
        });
    } catch (error) {
      console.warn(`[warn] Could not import blog posts for ${lang}:`, error);
    }
  }
  return docs;
}

async function mutateCreateOrReplace(docs: any[]) {
  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;
  const body = {mutations: docs.map((doc) => ({createOrReplace: doc}))};

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sanity mutation failed (${response.status}): ${text}`);
  }

  return response.json();
}

async function run() {
  const docs = [
    ...buildSiteSettingsDocs(),
    ...buildHomePageDocs(),
    ...buildI18nDocs(),
    ...buildServiceDocs(),
    ...buildCaseStudyDocs(),
    ...(await buildBlogDocsFromApi()),
  ];

  if (docs.length === 0) {
    console.log("No documents prepared for migration.");
    return;
  }

  const byType = docs.reduce<Record<string, number>>((acc, doc) => {
    acc[doc._type] = (acc[doc._type] || 0) + 1;
    return acc;
  }, {});

  console.log(`Prepared ${docs.length} documents for migration.`);
  console.log("Type distribution:", byType);

  if (MIGRATION_DRY_RUN) {
    console.log("DRY RUN enabled. No changes sent to Sanity.");
    return;
  }

  if (!SANITY_API_TOKEN) {
    throw new Error("Missing SANITY_API_TOKEN in environment.");
  }

  await mutateCreateOrReplace(docs);
  console.log("Migration finished successfully.");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
