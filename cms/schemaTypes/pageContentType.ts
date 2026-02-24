import {defineArrayMember, defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'Polski', value: 'pl'},
  {title: 'Angielski', value: 'en'},
]

export const pageContentType = defineType({
  name: 'pageContent',
  title: 'Treść Strony',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Strona',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Services', value: 'services'},
          {title: 'Contact', value: 'contact'},
          {title: 'Blog', value: 'blog'},
          {title: 'Blog Post', value: 'blogPost'},
          {title: 'Not Found', value: 'notFound'},
          {title: 'Layout Globalny', value: 'layout'},
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Wybierz stronę, której dotyczy konfiguracja sekcji.',
    }),
    defineField({
      name: 'language',
      title: 'Język',
      type: 'string',
      initialValue: 'pl',
      options: {list: languageOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientType',
      title: 'Typ klienta',
      type: 'string',
      options: {
        list: [
          {title: 'B2B', value: 'B2B'},
          {title: 'B2G', value: 'B2G'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => !['home', 'services'].includes(String(document?.pageKey || '')),
      description: 'Ustaw dla stron zależnych od segmentu klienta.',
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'trustStatsSection'}),
        defineArrayMember({type: 'servicesIntroSection'}),
        defineArrayMember({type: 'servicesListSection'}),
        defineArrayMember({type: 'caseStudiesSection'}),
        defineArrayMember({type: 'blogPreviewSection'}),
        defineArrayMember({type: 'contactHeaderSection'}),
        defineArrayMember({type: 'contactMethodsSection'}),
        defineArrayMember({type: 'contactFeaturesSection'}),
        defineArrayMember({type: 'contactFormSection'}),
        defineArrayMember({type: 'ctaBandSection'}),
        defineArrayMember({type: 'blogListControlsSection'}),
        defineArrayMember({type: 'blogPostMetaSection'}),
        defineArrayMember({type: 'navbarSection'}),
        defineArrayMember({type: 'footerSection'}),
        defineArrayMember({type: 'emptyStateSection'}),
        defineArrayMember({type: 'loadingStateSection'}),
        defineArrayMember({type: 'notFoundStateSection'}),
      ],
      description: 'Każda sekcja ma widoczność i kolejność; możesz zmieniać układ bez zmian w kodzie.',
    }),
  ],
  preview: {
    select: {
      title: 'pageKey',
      subtitle: 'language',
      clientType: 'clientType',
    },
    prepare(selection) {
      const {title, subtitle, clientType} = selection
      return {
        title: `${title}${clientType ? ` (${clientType})` : ''}`,
        subtitle,
      }
    },
  },
})
