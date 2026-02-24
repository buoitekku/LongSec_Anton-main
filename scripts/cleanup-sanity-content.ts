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

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "pcuqdu0d";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_VERSION = (process.env.SANITY_API_VERSION || "2025-02-19").replace(/^v/, "");
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const DRY_RUN = (process.env.CLEANUP_DRY_RUN || "false").toLowerCase() !== "false";

if (!SANITY_API_TOKEN) {
  throw new Error("Missing SANITY_API_TOKEN in environment.");
}

const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

const deletions = [
  '*[_type == "testimonial"]',
  '*[_type in ["homePage", "service", "caseStudy", "blogPost", "i18nString", "siteSettings"] && language == "ua"]',
  '*[_type in ["homePage", "service"] && clientType == "B2C"]',
  '*[_type == "service" && serviceKey in ["cybersecurity", "training"]]',
  '*[_type == "i18nString" && (key match "calendly.*" || key match "testimonials.*" || key match "cert.*" || key == "common.certifications" || key == "common.certifications.subtitle" || key == "footer.certifiedby" || key match "services.cybersecurity.*" || key match "services.training.*" || key match "features.cybersecurity.*" || key match "features.training.*")]',
];

const patches = [
  {
    query: '*[_type == "siteSettings"]',
    unset: ["calendlyUrl", "certifications"],
  },
];

async function mutate(mutations: any[]) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
    },
    body: JSON.stringify({mutations}),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Sanity cleanup failed (${response.status}): ${text}`);
  }

  return JSON.parse(text);
}

async function run() {
  const mutations = [
    ...deletions.map((query) => ({delete: {query}})),
    ...patches.map((patch) => ({patch: {query: patch.query, unset: patch.unset}})),
  ];

  console.log(`Prepared ${mutations.length} cleanup mutations.`);
  if (DRY_RUN) {
    console.log("CLEANUP_DRY_RUN enabled. No changes sent to Sanity.");
    return;
  }

  const result = await mutate(mutations);
  const txId = result?.transactionId || "n/a";
  const count = Array.isArray(result?.results) ? result.results.length : 0;
  console.log(`Cleanup finished. transactionId=${txId}, results=${count}`);
}

run().catch((error) => {
  console.error("Cleanup failed:", error);
  process.exit(1);
});
