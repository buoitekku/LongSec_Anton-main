import type {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Tłumaczenia')
        .child(
          S.list()
            .title('Tłumaczenia')
            .items([
              S.listItem()
                .title('Polski (PL)')
                .child(
                  S.documentTypeList('i18nString')
                    .title('Tłumaczenia PL')
                    .filter('_type == "i18nString" && language == "pl"'),
                ),
              S.listItem()
                .title('English (EN)')
                .child(
                  S.documentTypeList('i18nString')
                    .title('Translations EN')
                    .filter('_type == "i18nString" && language == "en"'),
                ),
              S.divider(),
              S.listItem()
                .title('Wszystkie tłumaczenia')
                .child(S.documentTypeList('i18nString').title('Wszystkie tłumaczenia')),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'i18nString'),
    ])
