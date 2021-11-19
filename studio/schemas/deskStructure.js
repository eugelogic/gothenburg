import S from '@sanity/desk-tool/structure-builder'

export default () =>
	S.list()
		// rename the Studio to 'Content Manager'
		.title('Content Manager')
		// list the items
		.items(
				[
					// start with a 'Settings' label which shows the Site Settings
					S.listItem()
						.title('Settings')
						.child(
								S.document()
									.schemaType('siteSettings')
									.documentId('siteSettings')
							),
					// add a divider
					S.divider(),
					// prevent the Site Settings from showing in the list
					...S.documentTypeListItems().filter(item => !['siteSettings'].includes(item.getId()))
				]
			)