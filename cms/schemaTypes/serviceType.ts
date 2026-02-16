import {defineArrayMember, defineField, defineType} from 'sanity'

const serviceKeyOptions = [
  {title: 'Cybersecurity', value: 'cybersecurity'},
  {title: 'Translations', value: 'translations'},
  {title: 'Training', value: 'training'},
  {title: 'OSINT', value: 'osint'},
  {title: 'Data Recovery', value: 'datarecovery'},
]

const languageOptions = [
  {title: 'Polish', value: 'pl'},
  {title: 'English', value: 'en'},
  {title: 'Ukrainian', value: 'ua'},
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
