import {defineArrayMember, defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polski', value: 'pl'},
  {title: 'Angielski', value: 'en'},
]

const serviceKeyOptions = [
  {title: 'Testy bezpieczeństwa fizycznego', value: 'physicalsecurity'},
  {title: 'Testy phishingowe', value: 'phishing'},
  {title: 'Szkolenia cyber awareness', value: 'cyberawareness'},
  {title: 'OSINT - wywiad jawnoźródłowy', value: 'osint'},
  {title: 'Informatyka śledcza', value: 'forensics'},
  {title: 'Odzyskiwanie danych', value: 'datarecovery'},
  {title: 'Usługi tłumaczeniowe', value: 'translations'},
]

const serviceIconOptions = [
  {title: '🔐 Kłódka', value: '🔐'},
  {title: '🎯 Cel', value: '🎯'},
  {title: '🎓 Szkolenia', value: '🎓'},
  {title: '🔎 Lupa', value: '🔎'},
  {title: '🕵️ Śledztwo', value: '🕵️'},
  {title: '💾 Dysk', value: '💾'},
  {title: '🌐 Glob', value: '🌐'},
]

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Ustawienia Globalne',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Język',
      type: 'string',
      options: {list: languageOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteName',
      title: 'Nazwa serwisu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Tekst logo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Zdjęcie hero',
      type: 'image',
      options: {hotspot: true},
      description: 'Opcjonalnie: obraz używany w sekcji hero.',
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'URL obrazu hero',
      type: 'url',
      description: 'Fallback dla sekcji hero, gdy nie dodano assetu.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefon kontaktowy',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-mail kontaktowy',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactAddress',
      title: 'Adres',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceNavItems',
      title: 'Pozycje menu usług',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'serviceKey',
              title: 'Klucz usługi',
              type: 'string',
              options: {list: serviceKeyOptions},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: {list: serviceIconOptions},
              description: 'Krótki symbol/emoji, np. 🔐.',
            }),
          ],
        }),
      ],
      description: 'Elementy dropdownu usług w nawigacji.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Linki społecznościowe',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Etykieta', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({
              name: 'icon',
              title: 'Nazwa ikony',
              type: 'string',
              description: 'linkedin, twitter, facebook, github',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'language',
    },
  },
})
