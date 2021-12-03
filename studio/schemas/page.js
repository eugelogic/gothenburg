import { FaRegFile } from 'react-icons/fa'

export default {
  name: 'page',
  title: 'Page',
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
      name: 'body',
      title: 'Body',
      type: 'text'
    }
  ],

  preview: {
    select: {
      title: 'title'
    }
  }
}
