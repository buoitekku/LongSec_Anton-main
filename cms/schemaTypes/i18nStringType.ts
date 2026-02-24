import {defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polski', value: 'pl'},
  {title: 'English', value: 'en'},
]

const languageLabels: Record<string, string> = {
  pl: 'PL',
  en: 'EN',
}

const namespaceLabels: Record<string, string> = {
  nav: 'Nawigacja',
  common: 'Wspólne',
  hero: 'Hero',
  services: 'Usługi',
  features: 'Cechy usług',
  contact: 'Kontakt',
  trust: 'Statystyki',
  footer: 'Stopka',
  blog: 'Blog',
  cases: 'Case studies',
}

export const i18nStringType = defineType({
  name: 'i18nString',
  title: 'Tłumaczenie (i18n)',
  type: 'document',
  description:
    'Pojedynczy wpis słownika tłumaczeń. Używaj stabilnych kluczy, np. "nav.home" albo "services.forensics.title".',
  groups: [
    {name: 'meta', title: 'Meta', default: true},
    {name: 'content', title: 'Treść'},
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Język',
      type: 'string',
      options: {list: languageOptions, layout: 'radio'},
      group: 'meta',
      description: 'Wybierz język tej konkretnej wersji tłumaczenia.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Klucz tłumaczenia',
      type: 'string',
      group: 'meta',
      description:
        'Unikalny identyfikator. Zalecany format: "sekcja.pole" (np. "hero.badge", "contact.form.submit").',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(\.[a-z0-9_-]+)+$/, {
            name: 'dot.notation',
            invert: false,
          })
          .error('Użyj formatu np. "nav.home" albo "services.osint.title".'),
    }),
    defineField({
      name: 'value',
      title: 'Wartość',
      type: 'text',
      group: 'content',
      rows: 6,
      description: 'Treść wyświetlana w aplikacji.',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Klucz A-Z', name: 'keyAsc', by: [{field: 'key', direction: 'asc'}]},
    {title: 'Język A-Z', name: 'languageAsc', by: [{field: 'language', direction: 'asc'}]},
  ],
  preview: {
    select: {
      key: 'key',
      language: 'language',
      value: 'value',
    },
    prepare(selection) {
      const key = String(selection.key || '')
      const language = String(selection.language || '')
      const value = String(selection.value || '')
      const namespace = key.split('.')[0] || 'other'
      const namespaceLabel = namespaceLabels[namespace] || namespace
      const languageLabel = languageLabels[language] || language
      const shortValue = value.length > 60 ? `${value.slice(0, 60)}...` : value

      return {
        title: key || '(brak klucza)',
        subtitle: `${languageLabel} | ${namespaceLabel} | ${shortValue}`,
      }
    },
  },
})

