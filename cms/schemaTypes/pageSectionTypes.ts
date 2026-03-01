import {defineArrayMember, defineField, defineType} from 'sanity'

const baseFields = [
  defineField({
    name: 'sectionId',
    title: 'ID sekcji',
    type: 'string',
    description: 'Stabilny identyfikator sekcji (np. hero, trust-stats).',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'enabled',
    title: 'Widoczna',
    type: 'boolean',
    initialValue: true,
    description: 'Odznacz, aby ukryć sekcję na stronie.',
  }),
  defineField({
    name: 'order',
    title: 'Kolejność',
    type: 'number',
    initialValue: 0,
    validation: (rule) => rule.required().integer().min(0),
  }),
]

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Sekcja Hero',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'badge', title: 'Badge', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'primaryCta', title: 'Przycisk główny', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'secondaryCta', title: 'Przycisk dodatkowy', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const trustStatsSectionType = defineType({
  name: 'trustStatsSection',
  title: 'Sekcja Statystyki Zaufania',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({
      name: 'items',
      title: 'Statystyki',
      type: 'array',
      validation: (rule) => rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Wartość', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'label', title: 'Etykieta', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
  ],
})

export const servicesIntroSectionType = defineType({
  name: 'servicesIntroSection',
  title: 'Sekcja Wstęp Usług',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'featuresTitle', title: 'Tytuł listy cech', type: 'string', initialValue: 'Zakres'}),
    defineField({name: 'learnMoreLabel', title: 'Etykieta "Dowiedz się więcej"', type: 'string'}),
    defineField({name: 'needHelpTitle', title: 'Tytuł kafelka pomocy', type: 'string'}),
    defineField({name: 'needHelpDescription', title: 'Opis kafelka pomocy', type: 'text', rows: 2}),
    defineField({name: 'scheduleLabel', title: 'Etykieta przycisku konsultacji', type: 'string'}),
  ],
})

export const servicesListSectionType = defineType({
  name: 'servicesListSection',
  title: 'Sekcja Lista Usług',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'contactExpertsLabel', title: 'CTA kontakt z ekspertami', type: 'string'}),
  ],
})

export const caseStudiesSectionType = defineType({
  name: 'caseStudiesSection',
  title: 'Sekcja Case Studies',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'challengeLabel', title: 'Etykieta: Wyzwanie', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'solutionLabel', title: 'Etykieta: Rozwiązanie', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'resultsLabel', title: 'Etykieta: Rezultaty', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'cardCtaLabel', title: 'Przycisk na karcie', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'contactLabel', title: 'Przycisk końcowy', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const blogPreviewSectionType = defineType({
  name: 'blogPreviewSection',
  title: 'Sekcja Podgląd Bloga',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'viewAllLabel', title: 'Przycisk: wszystkie artykuły', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'readMoreLabel', title: 'Przycisk: czytaj więcej', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const contactHeaderSectionType = defineType({
  name: 'contactHeaderSection',
  title: 'Sekcja Nagłówek Kontakt',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
})

export const contactMethodsSectionType = defineType({
  name: 'contactMethodsSection',
  title: 'Sekcja Metody Kontaktu',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł sekcji', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł sekcji', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'phoneLabel', title: 'Etykieta telefonu', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'emailLabel', title: 'Etykieta e-mail', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'addressLabel', title: 'Etykieta adresu', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'hoursLabel', title: 'Etykieta godzin', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'hoursDescription', title: 'Opis godzin', type: 'string'}),
    defineField({name: 'emailDescription', title: 'Opis e-mail', type: 'string'}),
    defineField({name: 'addressDescription', title: 'Opis adresu', type: 'string'}),
    defineField({name: 'hoursValue', title: 'Wartość godzin', type: 'string'}),
    defineField({name: 'hoursTime', title: 'Zakres godzin', type: 'string'}),
  ],
})

export const contactFeaturesSectionType = defineType({
  name: 'contactFeaturesSection',
  title: 'Sekcja Atuty Kontaktu',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({
      name: 'items',
      title: 'Elementy',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Ikona', type: 'string', description: 'users, award, clock'}),
            defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Opis', type: 'text', rows: 2, validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
  ],
})

export const contactFormSectionType = defineType({
  name: 'contactFormSection',
  title: 'Sekcja Formularz Kontaktowy',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł formularza', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'nameLabel', title: 'Pole: imię i nazwisko', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'emailLabel', title: 'Pole: e-mail', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'companyLabel', title: 'Pole: instytucja/firma', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'phoneLabel', title: 'Pole: telefon', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'serviceLabel', title: 'Pole: usługa', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'messageLabel', title: 'Pole: wiadomość', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'submitLabel', title: 'Przycisk: wyślij', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'sendingLabel', title: 'Przycisk: wysyłanie', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'successTitle', title: 'Toast sukces: tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'successDescription', title: 'Toast sukces: opis', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'errorTitle', title: 'Toast błąd: tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'errorDescription', title: 'Toast błąd: opis', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const ctaBandSectionType = defineType({
  name: 'ctaBandSection',
  title: 'Sekcja CTA',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'primaryLabel', title: 'Przycisk główny', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'secondaryLabel', title: 'Przycisk dodatkowy', type: 'string'}),
  ],
})

export const blogListControlsSectionType = defineType({
  name: 'blogListControlsSection',
  title: 'Sekcja Kontrolki Listy Bloga',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'searchPlaceholder', title: 'Placeholder wyszukiwarki', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'allLabel', title: 'Filtr: wszystkie', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'readMoreLabel', title: 'Przycisk czytaj więcej', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'categoryPrefix', title: 'Prefix kategorii', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const blogPostMetaSectionType = defineType({
  name: 'blogPostMetaSection',
  title: 'Sekcja Meta Artykułu Bloga',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'backLabel', title: 'Przycisk powrotu', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'categoryPrefix', title: 'Prefix kategorii', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const navbarSectionType = defineType({
  name: 'navbarSection',
  title: 'Sekcja Nawigacja',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'homeLabel', title: 'Menu: Strona główna', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'servicesLabel', title: 'Menu: Usługi', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'blogLabel', title: 'Menu: Blog', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'contactLabel', title: 'Menu: Kontakt', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const footerSectionType = defineType({
  name: 'footerSection',
  title: 'Sekcja Stopka',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'description', title: 'Opis stopki', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'servicesTitle', title: 'Kolumna: usługi', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'companyTitle', title: 'Kolumna: firma', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'aboutLabel', title: 'Link: o nas', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'careerLabel', title: 'Link: kariera', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'privacyLabel', title: 'Link: polityka prywatności', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'copyrightLabel', title: 'Prawa autorskie', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const emptyStateSectionType = defineType({
  name: 'emptyStateSection',
  title: 'Sekcja Empty State',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 2, validation: (rule) => rule.required()}),
  ],
})

export const loadingStateSectionType = defineType({
  name: 'loadingStateSection',
  title: 'Sekcja Loading State',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'label', title: 'Etykieta ładowania', type: 'string', validation: (rule) => rule.required()}),
  ],
})

export const notFoundStateSectionType = defineType({
  name: 'notFoundStateSection',
  title: 'Sekcja 404 / Not Found',
  type: 'object',
  fields: [
    ...baseFields,
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 2, validation: (rule) => rule.required()}),
    defineField({name: 'backLabel', title: 'Przycisk powrotu', type: 'string'}),
  ],
})

export const pageSectionTypes = [
  heroSectionType,
  trustStatsSectionType,
  servicesIntroSectionType,
  servicesListSectionType,
  caseStudiesSectionType,
  blogPreviewSectionType,
  contactHeaderSectionType,
  contactMethodsSectionType,
  contactFeaturesSectionType,
  contactFormSectionType,
  ctaBandSectionType,
  blogListControlsSectionType,
  blogPostMetaSectionType,
  navbarSectionType,
  footerSectionType,
  emptyStateSectionType,
  loadingStateSectionType,
  notFoundStateSectionType,
]
