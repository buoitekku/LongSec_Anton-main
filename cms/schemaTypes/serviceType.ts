import {defineArrayMember, defineField, defineType} from 'sanity'

const serviceKeyOptions = [
  {title: 'Physical Security', value: 'physicalsecurity'},
  {title: 'Phishing', value: 'phishing'},
  {title: 'Cyber Awareness', value: 'cyberawareness'},
  {title: 'OSINT', value: 'osint'},
  {title: 'Forensics', value: 'forensics'},
  {title: 'Data Recovery', value: 'datarecovery'},
  {title: 'Translations', value: 'translations'},
]

const iconOptions = [
  {title: '🔐 Kłódka', value: '🔐'},
  {title: '🎯 Cel', value: '🎯'},
  {title: '🎓 Szkolenia', value: '🎓'},
  {title: '🔎 Lupa', value: '🔎'},
  {title: '🕵️ Śledztwo', value: '🕵️'},
  {title: '💾 Dysk', value: '💾'},
  {title: '🌐 Glob', value: '🌐'},
]

const languageOptions = [
  {title: 'Polish', value: 'pl'},
  {title: 'English', value: 'en'},
]

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'serviceKey',
      title: 'Service Key',
      type: 'string',
      options: {list: serviceKeyOptions, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: iconOptions, layout: 'dropdown'},
      description: 'Ikona usługi używana w nawigacji i sekcjach usług.',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'pl',
      options: {list: languageOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
      options: {
        list: [
          {title: 'B2B', value: 'B2B'},
          {title: 'B2G', value: 'B2G'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Order Asc',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'serviceKey',
    },
  },
})
