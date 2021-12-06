export default {
    type: 'object',
    name: 'heroSection',
    title: 'Hero',
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
        name: 'backgroundImage',
        title: 'Background image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }
    ],
    preview: {
      select: {
        title: 'heading',
        media: 'backgroundImage',
      },
      prepare({ title, media }) {
        return {
          title,
          subtitle: 'Hero section',
          media,
        };
      },
    },
  };