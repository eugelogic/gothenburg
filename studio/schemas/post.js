import { FaRegFile } from 'react-icons/fa'

export default {
  name: 'post',
  title: 'Post',
  icon: FaRegFile,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      description: 'SEO: separate with commas.'
    },
    {
      name: 'synonyms',
      title: 'Synonyms',
      type: 'string',
      description: 'SEO: similar words to inform the SEO review.'
    },
    {
      name: 'description',
      description: 'SEO: this will show on a search engine result page.',
      title: 'Description',
      rows: 5,
      type: 'text',
      validation: (Rule) =>
        Rule.max(160).error(
          'SEO descriptions are usually better when they are below 160 characters.'
        )
    },
    {
      name: 'excerpt',
      description: 'This is a short description of the post appearing on the blog index.',
      title: 'Excerpt',
      rows: 5,
      type: 'text',
      validation: (Rule) =>
        Rule.max(280).error(
          'Please keep it within 280 characters.'
        )
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image to improve SEO and accessibility.',
          options: {
            isHighlighted: true
          }
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
