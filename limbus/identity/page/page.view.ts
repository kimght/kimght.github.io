namespace $.$$ {
	
	// TODO: Можно было бы и объеденить с $kimght_limbus_story
	export class $kimght_limbus_identity_page extends $.$kimght_limbus_identity_page {
		@ $mol_mem
		pages() {
			return [
				this.Identities_list_page(),
				...this.current_chapter(),
			]
		}
		
		@ $mol_mem
		toc() {
			const identities = this.$.$kimght_limbus_identity.list()
			const identities_toc: { [key: string]: string[] } = {}
			
			for ( const identity of identities ) {
				identities_toc[ identity.id.toString() ] = [ identity.name ]
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
