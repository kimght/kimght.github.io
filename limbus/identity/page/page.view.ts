namespace $.$$ {
	
	// TODO: Можно было бы и объеденить с $kimght_limbus_story
	export class $kimght_limbus_identity_page extends $.$kimght_limbus_identity_page {
		@ $mol_mem
		search( next?: string ) {
			if ( next === undefined ) next = ""

			if ( next.length === 0 ) {
				this.toc_levels_expanded( 0 )
			} else {
				this.toc_levels_expanded( 1 )
			}

			return next || ""
		}

		@ $mol_mem
		toc_levels_expanded( next?: number ) {
			if ( !next ) return 0
			return next
		}

		@ $mol_mem
		pages() {
			return [
				this.Identities_list_page(),
				...this.current_chapter(),
			]
		}
		
		@ $mol_mem
		search_regex() {
			if ( !this.search() ) {
				return null
			}
			
			const options = this.search().split( /\s+/g ).filter( Boolean )
			if ( !options.length ) return null
			const variants = { ... options } as Record< number, string >
			return $mol_regexp.from( { needle: variants }, { ignoreCase: true } )
		}
		
		@ $mol_mem
		toc() {
			const search = this.search_regex()
			const identities = this.$.$kimght_limbus_identity.list()
			const identities_toc: { [key: string]: string[] } = {}
			
			for ( const identity of identities ) {
				if ( search === null || identity.title.match( search ) ) {
					identities_toc[ identity.id.toString() ] = [ identity.name ]
				}
			}
			
			return identities_toc
		}
		
		item_title( path: readonly string[] ) {
			return this.$.$kimght_limbus_identity
				.item( +path.at(-1)! )
				.title() ?? ""
		}

		@ $mol_mem
		chapter_active() {
			const slug = this.$.$mol_state_arg.value( "chapter" )
			if ( !slug ) return null

			return slug
		}

		current_chapter() {
			if ( this.chapter_active() !== null ) {
				return [ this.Identity_page( this.chapter_active() ) ]
			}

			return []
		}
		
		@ $mol_mem_key
		identity_id( id: string ) {
			return id
		}
		
		@ $mol_mem_key
		identity_slug( id: readonly string[] ) {
			return `P${id.at(-1)!}`
		}
		
		identity_base_art_url( id: string ) {
			return this.$.$kimght_limbus_identity.item( +id.slice(1) ).art_base_url()
		}
		
		identity_uptie_art_url( id: string ) {
			return this.$.$kimght_limbus_identity.item( +id.slice(1) ).art_uptie_url()
		}

		identity_title( id: string ) {
			return this.$.$kimght_limbus_identity.item( +id.slice(1) ).title() ?? ""
		}
	}
}
