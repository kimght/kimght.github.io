namespace $.$$ {

	const { rem, px } = $mol_style_unit
	
	$mol_style_define( $kimght_limbus_chapter_line, {
		justify: {
			content: "space-between",
		},
		
		Place: {
			padding: $mol_gap.text,
			justify: { content: "center", },
			background: { color: $mol_theme.hover, },
			border: { radius: $mol_gap.round, },
		},
		
		Picture: {
			width: px( 128 ),
			height: px( 128 ),
			border: { radius: $mol_gap.round, },
			background: { color: $mol_theme.card, },
		},
		
		Content: {
			padding: px( 0 ),
		},
		
		gap: $mol_gap.block,
		
		Text: {
			wordBreak: "break-word",
			background: { color: $mol_theme.card, },
			border: { radius: $mol_gap.round, },
			padding: $mol_gap.text,
			flex: {
				grow: 100,
				shrink: 1,
				basis: rem( 10 ),
			},
			align: {
				self: "stretch",
			}
		},
		
		Speaker: {
			justify: { content: "center", },
		},
		
		Name: {
			wordBreak: "break-word",
			hyphens: "auto",
			position: "absolute",
			zIndex: 1,
			padding: $mol_gap.text,
			align: { self: "end", },
			textShadow: "0 0 2.5px #000, 0 0 2.5px #000,0 0 2.5px #000,0 0 2.5px #000,0 0 2.5px #000",
			textAlign: "center",
			lineHeight: "1rem",
			color: "white",
			maxWidth: "128px",
		}
	} )
	
}
