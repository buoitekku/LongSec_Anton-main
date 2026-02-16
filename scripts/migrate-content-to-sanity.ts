import {translations} from "../client/src/lib/i18n";
import fs from "node:fs";
import path from "node:path";

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const idx = trimmed.indexOf("=");
    if (idx <= 0) {
      continue;
    }
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

type Language = "pl" | "en" | "ua";
type ClientType = "B2B" | "B2C";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "pcuqdu0d";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_VERSION = (process.env.SANITY_API_VERSION || "2025-02-19").replace(/^v/, "");
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const BLOG_API_BASE_URL = process.env.MIGRATION_BLOG_API || "http://localhost:5000";

if (!SANITY_API_TOKEN) {
  throw new Error("Missing SANITY_API_TOKEN in environment.");
}

const languages: Language[] = ["pl", "en", "ua"];
const clientTypes: ClientType[] = ["B2B", "B2C"];

const serviceKeys = [
  "cybersecurity",
  "translations",
  "training",
  "osint",
  "datarecovery",
] as const;

const serviceFeatures: Record<(typeof serviceKeys)[number], string[]> = {
  cybersecurity: [
    "services.cybersecurity.features.audit",
    "services.cybersecurity.features.monitoring",
    "services.cybersecurity.features.incident",
    "services.cybersecurity.features.compliance",
    "services.cybersecurity.features.training",
    "services.cybersecurity.features.consulting",
  ],
  translations: [
    "services.translations.features.technical",
    "services.translations.features.legal",
    "services.translations.features.medical",
    "services.translations.features.business",
    "services.translations.features.certified",
    "services.translations.features.localization",
  ],
  training: [
    "services.training.features.cybersecurity",
    "services.training.features.compliance",
    "services.training.features.awareness",
    "services.training.features.technical",
    "services.training.features.custom",
    "services.training.features.certification",
  ],
  osint: [
    "services.osint.features.intelligence",
    "services.osint.features.investigation",
    "services.osint.features.monitoring",
    "services.osint.features.analysis",
    "services.osint.features.reporting",
    "services.osint.features.consulting",
  ],
  datarecovery: [
    "services.datarecovery.features.hdd",
    "services.datarecovery.features.ssd",
    "services.datarecovery.features.raid",
    "services.datarecovery.features.mobile",
    "services.datarecovery.features.forensics",
    "services.datarecovery.features.emergency",
  ],
};

function t(lang: Language, key: string): string {
  return (
    (translations as any)?.[lang]?.[key] ??
    (translations as any)?.pl?.[key] ??
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
    return [
      {
        _type: "block",
        style: "normal",
        children: [{_type: "span", text: ""}],
      },
    ];
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
        heroTitle: t(
          lang,
          clientType === "B2B" ? "hero.title.b2b" : "hero.title.b2c",
        ),
        heroSubtitle: t(
          lang,
          clientType === "B2B" ? "hero.subtitle.b2b" : "hero.subtitle.b2c",
        ),
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
    const entries = Object.entries((translations as any)?.[lang] || {});
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
  return languages.map((lang) => ({
    _id: `siteSettings-${lang}`,
    _type: "siteSettings",
    language: lang,
    siteName: "LongSec",
    logoText: "LongSec",
    contactPhone: "+48 22 123 4567",
    contactEmail: "kontakt@longsec.pl",
    contactAddress: "ul. Krakowskie Przedmiescie 5, 00-068 Warszawa",
    calendlyUrl: "https://calendly.com/your-username/consultation",
    serviceNavItems: [
      { serviceKey: "cybersecurity", icon: "S1" },
      { serviceKey: "translations", icon: "S2" },
      { serviceKey: "training", icon: "S3" },
      { serviceKey: "osint", icon: "S4" },
      { serviceKey: "datarecovery", icon: "S5" },
    ],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { label: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { label: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { label: "GitHub", url: "https://github.com", icon: "github" },
    ],
    certifications: [
      { short: "ISO", full: "ISO 27001" },
      { short: "CS", full: "CISSP" },
    ],
  }));
}

function buildServiceDocs() {
  const docs: any[] = [];
  for (const lang of languages) {
    for (const clientType of clientTypes) {
      serviceKeys.forEach((serviceKey, index) => {
        docs.push({
          _id: `service-${lang}-${clientType}-${serviceKey}`,
          _type: "service",
          name: t(lang, `services.${serviceKey}.title`),
          serviceKey,
          language: lang,
          clientType,
          description: textToPortableText(
            t(lang, `services.${serviceKey}.description.${clientType.toLowerCase()}`),
          ),
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

function buildTestimonialDocs() {
  return [
    {
      _id: "testimonial-pl-1",
      _type: "testimonial",
      quote:
        "Profesjonalny audit bezpieczenstwa pomogl nam zidentyfikowac krytyczne luki w systemie. Zespol LongSec wykazal sie wysoka kompetencja i doswiadczeniem.",
      author: "Marek Wisniewski",
      position: "CTO, TechCorp Solutions",
      language: "pl",
      rating: 5,
      featured: true,
      order: 0,
    },
    {
      _id: "testimonial-pl-2",
      _type: "testimonial",
      quote:
        "Tlumaczenia dokumentacji technicznej byly wykonane na najwyzszym poziomie. Precyzja terminologiczna i dotrzymanie terminow.",
      author: "Anna Kowalska",
      position: "PM, Software House Krakow",
      language: "pl",
      rating: 5,
      featured: true,
      order: 1,
    },
    {
      _id: "testimonial-pl-3",
      _type: "testimonial",
      quote:
        "Szkolenia z cyberbezpieczenstwa byly praktyczne i przystepnie poprowadzone. Zespol podniosl swoje kompetencje.",
      author: "Piotr Nowak",
      position: "IT Manager, Bank Regional",
      language: "pl",
      rating: 5,
      featured: true,
      order: 2,
    },
  ];
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
  featuredImage?: string | null;
  imageAlt?: string | null;
  createdAt?: string;
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
            category: ["cybersecurity", "translations", "training", "osint", "datarecovery"].includes(
              post.category,
            )
              ? post.category
              : "cybersecurity",
            author: post.author || "LongSec Team",
            language: (post.language as Language) || lang,
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
  const body = {
    mutations: docs.map((doc) => ({createOrReplace: doc})),
  };

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
    ...buildTestimonialDocs(),
    ...(await buildBlogDocsFromApi()),
  ];

  if (docs.length === 0) {
    console.log("No documents prepared for migration.");
    return;
  }

  console.log(`Prepared ${docs.length} documents for migration.`);
  await mutateCreateOrReplace(docs);
  console.log("Migration finished successfully.");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
