import {defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polish', value: 'pl'},
  {title: 'English', value: 'en'},
  {title: 'Ukrainian', value: 'ua'},
]

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
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
          {title: 'B2C', value: 'B2C'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'language',
    },
  },
})

