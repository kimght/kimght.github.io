namespace $.$$ {
	
	export class $kimght_limbus_chapter_page extends $.$kimght_limbus_chapter_page {
		
		@ $mol_mem
		lines() {
			return this.$.$kimght_limbus_chapter_line_data.list( {
				chapter_id: this.chapter_id(),
				language: this.language(),
			} )
		}
		
		@ $mol_mem
		lines_list() {
			return this.lines()
				.map( ( line, index ) => this.Line( index ) )
		}
		
		@ $mol_mem_key
		line( index: number ) {
			return this.lines()[ index ]
		}
		
		@ $mol_mem
		language( next?: any ) {
			if ( next ) {
				this.$.$mol_state_local.value<string>( "$kimght_limbus_language", String( next ) )
				return next
			}
			
			return this.$.$mol_state_local.value<string>( "$kimght_limbus_language" ) || "ru_mtl"
		}
		
		@ $mol_mem
		content_language() {
			const languages = {
				"ru_mtl": "ru",
				"ru_crescent": "ru",
				"ru_divine": "ru",
				"en": "en",
				"jp": "jp",
				"kr": "kr",
			}
			
			return languages[ this.language() as keyof typeof languages ] ?? "en"
		}

		@ $mol_mem
		search_enabled( next?: boolean ) {
			if ( next === undefined ) {
				return false
			}
			
			if ( next ) {
				this.Search().Query().focused( true )
			} else {
				this.search( "" )
			}
			
			return next
		}

		search_start( event: Event ) {
			this.search_enabled( true )
			event.preventDefault()
		}
		
		search_end( event: Event ) {
			this.search_enabled( false )
			this.Search_toggle().focused( true )
			event.preventDefault()
		}
		
		head() {
			return [
				this.Title(),
				this.Tools(),
				... this.search_enabled() ? [ this.Search() ] : [],
			]
		}
		
	}
	
}
