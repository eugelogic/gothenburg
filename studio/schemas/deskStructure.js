import S from '@sanity/desk-tool/structure-builder'
import { HiOutlineCog } from 'react-icons/hi'

export default () =>
  S.list()
    // rename the Studio to 'Content Manager'
    .title('Content Manager')
    // list the items
    .items([
      // start with a 'Settings' label which shows the Site Settings
      S.listItem()
        .title('Settings')
        .icon(HiOutlineCog)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      // add a divider
      S.divider(),
      // prevent the Site Settings from showing in the list
      ...S.documentTypeListItems().filter((item) => !['siteSettings'].includes(item.getId()))
    ])
