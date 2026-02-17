import {defineArrayMember, defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polish', value: 'pl'},
  {title: 'English', value: 'en'},
  {title: 'Ukrainian', value: 'ua'},
]

const serviceKeyOptions = [
  {title: 'Cybersecurity', value: 'cybersecurity'},
  {title: 'Translations', value: 'translations'},
  {title: 'Training', value: 'training'},
  {title: 'OSINT', value: 'osint'},
  {title: 'Data Recovery', value: 'datarecovery'},
]

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
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
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL',
      type: 'url',
      description:
        'Optional direct image URL. Used when Hero Image asset is not set.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly URL',
      type: 'url',
    }),
    defineField({
      name: 'serviceNavItems',
      title: 'Service Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'serviceKey',
              title: 'Service Key',
              type: 'string',
              options: {list: serviceKeyOptions},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Use emoji or short label, e.g. 🔐',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'linkedin, twitter, facebook, github',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'short', title: 'Short Label', type: 'string'}),
            defineField({name: 'full', title: 'Full Label', type: 'string'}),
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

