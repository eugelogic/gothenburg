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
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      description: 'Select pages for the top menu',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }],
        },
      ],
    }
  ]
}
