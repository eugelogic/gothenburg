export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [
    // 'create',
    // 'delete',
    'update',
    'publish'
  ],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string'
    },
    {
      name: 'shortDescription',
      title: 'Browser Tab Description',
      type: 'string'
    },
    {
      name: 'siteDescription',
      title: 'Meta Description',
      type: 'text'
    }
  ]
}
