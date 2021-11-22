import { config } from './config'
import { createClient, createImageUrlBuilder, createPortableTextComponent } from 'next-sanity'

if (!config.projectId) {
  throw Error('No Project ID set. Check your environment variables.')
}

export const sanityClient = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {}
})
