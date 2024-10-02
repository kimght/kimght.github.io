namespace $.$$ {
	
	export class $kimght_limbus_note_list extends $.$kimght_limbus_note_list {
		current_chapter() {
			if ( this.note_active() !== null ) {
				return [ this.Note_page( this.note_active() ) ]
			}

			return []
		}

		@ $mol_mem
		pages() {
			return [
				this.Notes_list_page(),
				...this.current_chapter()
			]
		}
		
		@ $mol_mem_key
		item_title( path: readonly string[] ) {
			return path.at(-1)!
		}
		
		@ $mol_mem_key
		note_folder( path: readonly string[] ) {
			return path.join( "/" )
		}
		
		@ $mol_mem_key
		folder_title( id: readonly string[] ): string {
			return id.join( " / " )
		}
		
		@ $mol_mem
		note_active() {
			const slug = this.$.$mol_state_arg.value( "folder" )
			if ( !slug ) return null
				
			let path = slug.split( "/" )
			if (path.at(-1) === path.at(-2)) {
				return path.slice(0, -1)
			}
			
			return path
		}
		
		@ $mol_mem
		notes() {
			return this.$.$kimght_limbus_note_data.meta().notes
		}
		
		@ $mol_mem
		toc() {
			const notes: { [key: string]: readonly string[] } = {}
			
			for (let i = 0; i < this.notes().length; i++) {
				const last = this.notes()[ i ].path.at(-1)!
				notes[ last ] = [ this.notes()[ i ].path.join("/") ]
			}
			
			return notes
		}
	}
	
}
