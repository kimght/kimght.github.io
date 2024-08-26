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
		
	}
	
}
