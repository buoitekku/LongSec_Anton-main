import {blogPostType} from './blogPostType'
import {serviceType} from './serviceType'
import {caseStudyType} from './caseStudyType'
import {homePageType} from './homePageType'
import {i18nStringType} from './i18nStringType'
import {siteSettingsType} from './siteSettingsType'
import {pageContentType} from './pageContentType'
import {pageSectionTypes} from './pageSectionTypes'

export const schemaTypes = [
  siteSettingsType,
  homePageType,
  pageContentType,
  ...pageSectionTypes,
  i18nStringType,
  blogPostType,
  serviceType,
  caseStudyType,
]
