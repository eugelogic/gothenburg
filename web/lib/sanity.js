import { config } from './config'
import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook
} from 'next-sanity'


if (!config.projectId) {
  throw Error('No Project ID set. Check your environment variables.')
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // https://github.com/sanity-io/block-content-to-react
  serializers: {}
})

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
