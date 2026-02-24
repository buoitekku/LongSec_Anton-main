import fs from 'node:fs'
import path from 'node:path'

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) return

  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx <= 0) continue
    const key = trimmed.slice(0, idx).trim()
    const value = trimmed.slice(idx + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

loadDotEnv()

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'pcuqdu0d'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_API_VERSION = (process.env.SANITY_API_VERSION || '2025-02-19').replace(/^v/, '')
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN
const CLEANUP_DRY_RUN = (process.env.CLEANUP_DRY_RUN || 'true').toLowerCase() !== 'false'

async function queryIds(groq: string) {
  const params = new URLSearchParams({query: groq})
  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?${params}`
  const response = await fetch(endpoint, {
    headers: SANITY_API_TOKEN ? {Authorization: `Bearer ${SANITY_API_TOKEN}`} : undefined,
  })

  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status})`)
  }

  const payload = (await response.json()) as {result?: Array<{_id: string}>}
  return (payload.result || []).map((item) => item._id)
}

async function deleteIds(ids: string[]) {
  if (!ids.length) return

  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`
  const body = {mutations: ids.map((id) => ({delete: {id}}))}
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity delete failed (${response.status}): ${text}`)
  }
}

async function run() {
  const selectors = [
    '*[_type == "blogPost" && language == "ua"]{_id}',
    '*[_type == "caseStudy" && language == "ua"]{_id}',
    '*[_type == "service" && language == "ua"]{_id}',
    '*[_type == "homePage" && language == "ua"]{_id}',
    '*[_type == "siteSettings" && language == "ua"]{_id}',
    '*[_type == "i18nString" && language == "ua"]{_id}',
    '*[_type == "service" && clientType == "B2C"]{_id}',
    '*[_type == "homePage" && clientType == "B2C"]{_id}',
    '*[_type == "i18nString" && key match "certification.*"]{_id}',
    '*[_type == "i18nString" && key match "testimonial.*"]{_id}',
    '*[_type == "i18nString" && key match "calendly.*"]{_id}',
  ]

  const allIds = new Set<string>()
  for (const groq of selectors) {
    const ids = await queryIds(groq)
    ids.forEach((id) => allIds.add(id))
  }

  const ids = Array.from(allIds)
  console.log(`Found ${ids.length} docs to clean up.`)

  if (CLEANUP_DRY_RUN) {
    console.log('DRY RUN enabled. No delete operations sent.')
    return
  }

  if (!SANITY_API_TOKEN) {
    throw new Error('Missing SANITY_API_TOKEN in environment.')
  }

  await deleteIds(ids)
  console.log('Cleanup finished successfully.')
}

run().catch((error) => {
  console.error('Cleanup failed:', error)
  process.exit(1)
})
