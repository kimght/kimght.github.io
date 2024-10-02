namespace $.$$ {

	const { rem, px } = $mol_style_unit
		
	// [kimght_tag_tree_tag_content] {
	// 	padding-left: var(--mol_gap_block);
	// 	margin-left: var(--mol_gap_block);
	// 	box-shadow: inset 1px 0 0 0 var(--mol_theme_line);
	// }
	//
	// [kimght_tag_tree_item] {
	// 	padding: var(--mol_gap_text);
	// 	padding-left: 0;
	// }
	//
	// [kimght_tag_tree_tag_trigger_icon] {
	// 	margin-left: -1rem;
	// 	margin-right: -0.25rem;
	// }


	$mol_style_define( $kimght_tag_tree, {
		Tag: {
			Content: {
				padding: { left: $mol_gap.block },
				margin: {left: $mol_gap.block },
				boxShadow: `inset 1px 0 0 0 ${ $mol_theme.line }`,
			},
			
			Trigger: {
				Icon: {
					margin: {
						left: rem(-1),
						right: rem(-0.25),
					}
				}
			}
		},

		Item: {
			padding: {
				top: $mol_gap.text,
				right: $mol_gap.text,
				bottom: $mol_gap.text,
				left: 0,
			},
		},
	} )

}
