import {defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polish', value: 'pl'},
  {title: 'English', value: 'en'},
  {title: 'Ukrainian', value: 'ua'},
]

export const i18nStringType = defineType({
  name: 'i18nString',
  title: 'I18n String',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {list: languageOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'language',
    },
  },
})

