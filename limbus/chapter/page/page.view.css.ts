namespace $.$$ {
	
	const { per } = $mol_style_unit
	
	$mol_style_define( $kimght_limbus_chapter_page, {
		Lines: {
			gap: $mol_gap.block,
		},
		
		Body_content: {
			gap: $mol_gap.block,
		},

		Search: {
			alignSelf: 'stretch',
			flex: {
				shrink: 0,
				basis: per(100),
			},
		},
	} )

}
