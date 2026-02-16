const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "pcuqdu0d";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_VERSION = (process.env.SANITY_API_VERSION || "2025-02-19").replace(/^v/, "");
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;

const sanityBaseUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

interface SanityQueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

function toQueryString(params: SanityQueryParams, jsonEncodeValues: boolean): URLSearchParams {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      search.set(key, jsonEncodeValues ? JSON.stringify(value) : String(value));
    }
  }
  return search;
}

export async function sanityFetch<T>(
  query: string,
  params: SanityQueryParams = {},
): Promise<T> {
  const search = new URLSearchParams();
  // `query` must be plain GROQ string.
  search.set("query", query);
  // GROQ params must be JSON literals.
  const paramSearch = toQueryString(
    Object.fromEntries(Object.entries(params).map(([key, value]) => [`$${key}`, value])),
    true,
  );
  for (const [key, value] of paramSearch.entries()) {
    search.set(key, value);
  }

  const headers: Record<string, string> = {};
  if (SANITY_API_TOKEN) {
    headers.Authorization = `Bearer ${SANITY_API_TOKEN}`;
  }

  const response = await fetch(`${sanityBaseUrl}?${search.toString()}`, {
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sanity query failed (${response.status}): ${text}`);
  }

  const json = (await response.json()) as { result: T };
  return json.result;
}
