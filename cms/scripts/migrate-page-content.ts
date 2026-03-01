import fs from 'node:fs'
import path from 'node:path'

type Language = 'pl' | 'en'
type ClientType = 'B2B' | 'B2G'

type AnyDoc = Record<string, unknown>

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
const MIGRATION_DRY_RUN = (process.env.MIGRATION_DRY_RUN || 'true').toLowerCase() !== 'false'

const text = {
  pl: {
    nav: {home: 'Strona główna', services: 'Usługi', blog: 'Blog', contact: 'Kontakt'},
    footer: {
      description: 'LongSec - usługi cyberbezpieczeństwa dla B2B i B2G.',
      servicesTitle: 'Usługi',
      companyTitle: 'Firma',
      aboutLabel: 'O nas',
      careerLabel: 'Kariera',
      privacyLabel: 'Polityka prywatności',
      copyrightLabel: '© 2026 LongSec. Wszelkie prawa zastrzeżone.',
    },
    trust: [
      {value: '500+', label: 'Projektów'},
      {value: '98%', label: 'Zadowolonych klientów'},
      {value: '15+', label: 'Lat doświadczenia'},
    ],
  },
  en: {
    nav: {home: 'Home', services: 'Services', blog: 'Blog', contact: 'Contact'},
    footer: {
      description: 'LongSec - cybersecurity services for B2B and B2G.',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      aboutLabel: 'About us',
      careerLabel: 'Career',
      privacyLabel: 'Privacy policy',
      copyrightLabel: '© 2026 LongSec. All rights reserved.',
    },
    trust: [
      {value: '500+', label: 'Projects'},
      {value: '98%', label: 'Satisfied clients'},
      {value: '15+', label: 'Years of experience'},
    ],
  },
} as const

function buildLayoutDocs(lang: Language): AnyDoc {
  return {
    _id: `pageContent-layout-${lang}`,
    _type: 'pageContent',
    pageKey: 'layout',
    language: lang,
    sections: [
      {
        _type: 'navbarSection',
        sectionId: 'navbar',
        enabled: true,
        order: 0,
        homeLabel: text[lang].nav.home,
        servicesLabel: text[lang].nav.services,
        blogLabel: text[lang].nav.blog,
        contactLabel: text[lang].nav.contact,
      },
      {
        _type: 'footerSection',
        sectionId: 'footer',
        enabled: true,
        order: 1,
        ...text[lang].footer,
      },
    ],
  }
}

function buildHomeDocs(lang: Language, clientType: ClientType): AnyDoc {
  const isB2B = clientType === 'B2B'
  return {
    _id: `pageContent-home-${lang}-${clientType}`,
    _type: 'pageContent',
    pageKey: 'home',
    language: lang,
    clientType,
    sections: [
      {
        _type: 'heroSection',
        sectionId: 'hero',
        enabled: true,
        order: 0,
        badge: lang === 'pl' ? 'Eksperci bezpieczeństwa IT' : 'IT Security Experts',
        title: isB2B
          ? lang === 'pl' ? 'Rozwiązania cyberbezpieczeństwa dla firm' : 'Cybersecurity services for business'
          : lang === 'pl' ? 'Wsparcie bezpieczeństwa dla sektora publicznego' : 'Security support for public sector',
        subtitle: isB2B
          ? lang === 'pl'
            ? 'Wzmacniamy odporność organizacji przez testy, szkolenia i wywiad jawnoźródłowy.'
            : 'We strengthen resilience through tests, training and OSINT.'
          : lang === 'pl'
            ? 'Informatyka śledcza, odzyskiwanie danych i usługi tłumaczeniowe dla instytucji.'
            : 'Digital forensics, data recovery and translation services for institutions.',
        primaryCta: lang === 'pl' ? 'Bezpłatna konsultacja' : 'Free consultation',
        secondaryCta: lang === 'pl' ? 'Zobacz case studies' : 'View case studies',
      },
      {
        _type: 'trustStatsSection',
        sectionId: 'trust',
        enabled: true,
        order: 1,
        items: text[lang].trust,
      },
      {
        _type: 'servicesIntroSection',
        sectionId: 'services-intro',
        enabled: true,
        order: 2,
        title: isB2B ? (lang === 'pl' ? 'Oferta B2B' : 'B2B offer') : (lang === 'pl' ? 'Oferta B2G' : 'B2G offer'),
        subtitle: isB2B
          ? (lang === 'pl' ? 'Testy bezpieczeństwa fizycznego, phishing, szkolenia cyber awareness i OSINT.' : 'Physical security tests, phishing tests, cyber awareness and OSINT.')
          : (lang === 'pl' ? 'Informatyka śledcza, odzyskiwanie danych i usługi tłumaczeniowe.' : 'Digital forensics, data recovery and translation services.'),
        featuresTitle: lang === 'pl' ? 'Zakres' : 'Scope',
        learnMoreLabel: lang === 'pl' ? 'Dowiedz się więcej' : 'Learn more',
        needHelpTitle: lang === 'pl' ? 'Potrzebujesz pomocy?' : 'Need help?',
        needHelpDescription: lang === 'pl' ? 'Skontaktuj się z naszymi ekspertami.' : 'Contact our experts.',
        scheduleLabel: lang === 'pl' ? 'Umów konsultację' : 'Schedule consultation',
      },
      {
        _type: 'servicesListSection',
        sectionId: 'services-list',
        enabled: true,
        order: 3,
        contactExpertsLabel: lang === 'pl' ? 'Skontaktuj się z ekspertami' : 'Contact experts',
      },
      {
        _type: 'caseStudiesSection',
        sectionId: 'case-studies',
        enabled: true,
        order: 4,
        title: lang === 'pl' ? 'Nasze projekty' : 'Our projects',
        subtitle: lang === 'pl' ? 'Przykłady realizacji' : 'Delivery examples',
        challengeLabel: lang === 'pl' ? 'Wyzwanie' : 'Challenge',
        solutionLabel: lang === 'pl' ? 'Rozwiązanie' : 'Solution',
        resultsLabel: lang === 'pl' ? 'Rezultaty' : 'Results',
        cardCtaLabel: lang === 'pl' ? 'Potrzebujesz pomocy?' : 'Need help?',
        contactLabel: lang === 'pl' ? 'Skontaktuj się z nami' : 'Contact us',
      },
      {
        _type: 'blogPreviewSection',
        sectionId: 'blog-preview',
        enabled: true,
        order: 5,
        title: 'Blog',
        subtitle: lang === 'pl' ? 'Najnowsze artykuły o cyberbezpieczeństwie' : 'Latest cybersecurity articles',
        viewAllLabel: lang === 'pl' ? 'Zobacz wszystkie' : 'View all',
        readMoreLabel: lang === 'pl' ? 'Czytaj więcej' : 'Read more',
      },
      {
        _type: 'contactFormSection',
        sectionId: 'home-contact-form',
        enabled: true,
        order: 6,
        title: lang === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry',
        nameLabel: lang === 'pl' ? 'Imię i nazwisko' : 'Full name',
        emailLabel: 'Email',
        companyLabel: lang === 'pl' ? 'Instytucja/Firma' : 'Institution/Company',
        phoneLabel: lang === 'pl' ? 'Telefon' : 'Phone',
        serviceLabel: lang === 'pl' ? 'Usługa' : 'Service',
        messageLabel: lang === 'pl' ? 'Wiadomość' : 'Message',
        submitLabel: lang === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry',
        sendingLabel: lang === 'pl' ? 'Wysyłanie...' : 'Sending...',
        successTitle: lang === 'pl' ? 'Sukces' : 'Success',
        successDescription: lang === 'pl' ? 'Wiadomość wysłana. Odpowiemy do 24 godzin.' : 'Message sent. We will respond within 24h.',
        errorTitle: lang === 'pl' ? 'Błąd' : 'Error',
        errorDescription: lang === 'pl' ? 'Nie udało się wysłać formularza.' : 'Failed to send form.',
      },
    ],
  }
}

function buildServicesDocs(lang: Language, clientType: ClientType): AnyDoc {
  return {
    _id: `pageContent-services-${lang}-${clientType}`,
    _type: 'pageContent',
    pageKey: 'services',
    language: lang,
    clientType,
    sections: [
      {
        _type: 'servicesIntroSection',
        sectionId: 'services-intro',
        enabled: true,
        order: 0,
        title: clientType === 'B2B' ? (lang === 'pl' ? 'Oferta B2B' : 'B2B offer') : (lang === 'pl' ? 'Oferta B2G' : 'B2G offer'),
        subtitle: lang === 'pl' ? 'Wybierz usługę i poznaj szczegóły.' : 'Choose a service and see details.',
        featuresTitle: lang === 'pl' ? 'Zakres' : 'Scope',
      },
      {_type: 'servicesListSection', sectionId: 'services-list', enabled: true, order: 1, contactExpertsLabel: lang === 'pl' ? 'Skontaktuj się z ekspertami' : 'Contact experts'},
      {
        _type: 'ctaBandSection',
        sectionId: 'services-cta',
        enabled: true,
        order: 2,
        title: lang === 'pl' ? 'Gotowi do współpracy?' : 'Ready to collaborate?',
        subtitle: lang === 'pl' ? 'Skontaktuj się z nami, aby omówić potrzeby.' : 'Contact us to discuss your needs.',
        primaryLabel: lang === 'pl' ? 'Skontaktuj się z ekspertem' : 'Contact expert',
        secondaryLabel: lang === 'pl' ? 'Nasze projekty' : 'Our projects',
      },
    ],
  }
}

function buildContactDocs(lang: Language): AnyDoc {
  return {
    _id: `pageContent-contact-${lang}`,
    _type: 'pageContent',
    pageKey: 'contact',
    language: lang,
    sections: [
      {_type: 'contactHeaderSection', sectionId: 'contact-header', enabled: true, order: 0, title: lang === 'pl' ? 'Skontaktuj się z ekspertami' : 'Contact our experts', subtitle: lang === 'pl' ? 'Odpowiadamy do 24 godzin.' : 'We respond within 24 hours.'},
      {
        _type: 'contactMethodsSection',
        sectionId: 'contact-methods',
        enabled: true,
        order: 1,
        title: lang === 'pl' ? 'Sposoby kontaktu' : 'Contact methods',
        subtitle: lang === 'pl' ? 'Wybierz najwygodniejszy kanał.' : 'Choose the most convenient channel.',
        phoneLabel: lang === 'pl' ? 'Telefon' : 'Phone',
        emailLabel: 'Email',
        addressLabel: lang === 'pl' ? 'Adres' : 'Address',
        hoursLabel: lang === 'pl' ? 'Godziny pracy' : 'Working hours',
        hoursDescription: lang === 'pl' ? 'Poniedziałek - Piątek' : 'Monday - Friday',
        emailDescription: lang === 'pl' ? 'Odpowiedź do 24h' : 'Response within 24h',
        addressDescription: lang === 'pl' ? 'Biuro centralne' : 'Head office',
        hoursValue: lang === 'pl' ? 'Pon - Pt' : 'Mon - Fri',
        hoursTime: '9:00 - 17:00',
      },
      {
        _type: 'contactFeaturesSection',
        sectionId: 'contact-features',
        enabled: true,
        order: 2,
        items: [
          {icon: 'users', title: lang === 'pl' ? 'Doświadczony zespół' : 'Experienced team', description: lang === 'pl' ? 'Specjaliści praktycy' : 'Hands-on specialists'},
          {icon: 'award', title: lang === 'pl' ? 'Najwyższa jakość' : 'High quality', description: lang === 'pl' ? 'Jasne procedury i raportowanie' : 'Clear procedures and reporting'},
          {icon: 'clock', title: lang === 'pl' ? 'Szybka realizacja' : 'Fast delivery', description: lang === 'pl' ? 'Sprawna reakcja na incydenty' : 'Rapid incident response'},
        ],
      },
      {
        _type: 'contactFormSection',
        sectionId: 'contact-form',
        enabled: true,
        order: 3,
        title: lang === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry',
        nameLabel: lang === 'pl' ? 'Imię i nazwisko' : 'Full name',
        emailLabel: 'Email',
        companyLabel: lang === 'pl' ? 'Instytucja/Firma' : 'Institution/Company',
        phoneLabel: lang === 'pl' ? 'Telefon' : 'Phone',
        serviceLabel: lang === 'pl' ? 'Usługa' : 'Service',
        messageLabel: lang === 'pl' ? 'Wiadomość' : 'Message',
        submitLabel: lang === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry',
        sendingLabel: lang === 'pl' ? 'Wysyłanie...' : 'Sending...',
        successTitle: lang === 'pl' ? 'Sukces' : 'Success',
        successDescription: lang === 'pl' ? 'Wiadomość wysłana. Odpowiemy do 24 godzin.' : 'Message sent. We will respond within 24h.',
        errorTitle: lang === 'pl' ? 'Błąd' : 'Error',
        errorDescription: lang === 'pl' ? 'Nie udało się wysłać formularza.' : 'Failed to send form.',
      },
    ],
  }
}

function buildBlogDocs(lang: Language): AnyDoc {
  return {
    _id: `pageContent-blog-${lang}`,
    _type: 'pageContent',
    pageKey: 'blog',
    language: lang,
    sections: [
      {_type: 'blogListControlsSection', sectionId: 'blog-controls', enabled: true, order: 0, title: 'Blog', subtitle: lang === 'pl' ? 'Najnowsze artykuły o cyberbezpieczeństwie' : 'Latest cybersecurity articles', searchPlaceholder: lang === 'pl' ? 'Szukaj artykułów...' : 'Search articles...', allLabel: lang === 'pl' ? 'Wszystkie' : 'All', readMoreLabel: lang === 'pl' ? 'Czytaj więcej' : 'Read more', categoryPrefix: lang === 'pl' ? 'Kategoria:' : 'Category:'},
      {_type: 'emptyStateSection', sectionId: 'blog-empty', enabled: true, order: 1, title: lang === 'pl' ? 'Brak wyników' : 'No results', subtitle: lang === 'pl' ? 'Spróbuj innej frazy lub kategorii' : 'Try another phrase or category'},
      {_type: 'loadingStateSection', sectionId: 'blog-loading', enabled: true, order: 2, label: lang === 'pl' ? 'Ładowanie artykułów...' : 'Loading articles...'},
    ],
  }
}

function buildBlogPostDocs(lang: Language): AnyDoc {
  return {
    _id: `pageContent-blogPost-${lang}`,
    _type: 'pageContent',
    pageKey: 'blogPost',
    language: lang,
    sections: [
      {_type: 'blogPostMetaSection', sectionId: 'blog-post-meta', enabled: true, order: 0, backLabel: lang === 'pl' ? 'Wstecz' : 'Back', categoryPrefix: lang === 'pl' ? 'Kategoria:' : 'Category:'},
      {_type: 'loadingStateSection', sectionId: 'blog-post-loading', enabled: true, order: 1, label: lang === 'pl' ? 'Ładowanie artykułu...' : 'Loading article...'},
      {_type: 'notFoundStateSection', sectionId: 'blog-post-not-found', enabled: true, order: 2, title: lang === 'pl' ? 'Artykuł nie został znaleziony' : 'Post not found', subtitle: lang === 'pl' ? 'Sprawdź adres lub wróć do listy artykułów.' : 'Check the URL or go back to the article list.', backLabel: lang === 'pl' ? 'Wróć do bloga' : 'Back to blog'},
    ],
  }
}

function buildNotFoundDocs(lang: Language): AnyDoc {
  return {
    _id: `pageContent-notFound-${lang}`,
    _type: 'pageContent',
    pageKey: 'notFound',
    language: lang,
    sections: [
      {
        _type: 'notFoundStateSection',
        sectionId: '404-main',
        enabled: true,
        order: 0,
        title: lang === 'pl' ? '404 - Nie znaleziono strony' : '404 - Page Not Found',
        subtitle: lang === 'pl' ? 'Podana strona nie istnieje lub została przeniesiona.' : 'The requested page does not exist or has been moved.',
        backLabel: lang === 'pl' ? 'Wróć do strony głównej' : 'Back to home',
      },
    ],
  }
}

function allDocs() {
  const docs: AnyDoc[] = []
  const langs: Language[] = ['pl', 'en']
  const clientTypes: ClientType[] = ['B2B', 'B2G']

  for (const lang of langs) {
    docs.push(buildLayoutDocs(lang))
    docs.push(buildContactDocs(lang))
    docs.push(buildBlogDocs(lang))
    docs.push(buildBlogPostDocs(lang))
    docs.push(buildNotFoundDocs(lang))
    for (const clientType of clientTypes) {
      docs.push(buildHomeDocs(lang, clientType))
      docs.push(buildServicesDocs(lang, clientType))
    }
  }

  return docs
}

async function mutateCreateOrReplace(docs: AnyDoc[]) {
  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`
  const body = {mutations: docs.map((doc) => ({createOrReplace: doc}))}

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
    throw new Error(`Sanity mutation failed (${response.status}): ${text}`)
  }

  return response.json()
}

async function run() {
  const docs = allDocs()
  console.log(`Prepared ${docs.length} pageContent docs.`)

  if (MIGRATION_DRY_RUN) {
    console.log('DRY RUN enabled. No changes sent to Sanity.')
    return
  }

  if (!SANITY_API_TOKEN) {
    throw new Error('Missing SANITY_API_TOKEN in environment.')
  }

  await mutateCreateOrReplace(docs)
  console.log('Page content migration finished successfully.')
}

run().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
