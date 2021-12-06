export default {
    type: 'object',
    name: 'ctaSection',
    title: 'CTA',
    fields: [
      {
        name: 'heading',
        title: 'Heading',
        type: 'string'
      },
      {
        name: 'tagline',
        title: 'Tagline',
        type: 'text'
      },
      {
        name: 'ctaText',
        title: 'Button Text',
        type: 'string'
      },
      {
        name: 'ctaLink',
        title: 'Button Link',
        type: 'string'
      }
    ],
    preview: {
        select: {
          heading: 'heading',
        },
        prepare({ heading }) {
          return {
            title: `${heading}`,
            subtitle: 'CTA section',
          };
        },
      },
  };