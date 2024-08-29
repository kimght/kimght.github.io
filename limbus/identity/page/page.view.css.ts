namespace $.$$ {
	
	const { rem } = $mol_style_unit

	$mol_style_define( $kimght_limbus_identity_page, {
		Identities_list_page: {
			flex: {
				basis: rem( 20 )
			}
		},

		Identities_search: {
			align: {
				self: "stretch"
			},
			flex: {
				grow: 0,
				shrink: 0,
			}
		},

		Identity_page: {
			flex: {
				basis: rem( 50 ),
			}
		},
	} )

}
