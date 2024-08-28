namespace $ {
	
	export const $kimght_limbus_identity_json = $mol_data_record( {
		id: $mol_data_number,
		title: $mol_data_string,
		name: $mol_data_string,
	} )
	
	const Identity_data = $mol_data_record({
		dataList: $mol_data_array( $kimght_limbus_identity_json ),
	})
	
	const identity_list_url = "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/EN/Personalities.json"
	const identity_art_prefix_url = "https://raw.githubusercontent.com/kimght/LimbusStoryImages/main"
	
	export class $kimght_limbus_identity extends $mol_object2 {
		
		@ $mol_mem_key
		static item( id: number ) {
			const obj = new this
			obj.id = $mol_const( id )
			return obj
		}
		
		@ $mol_mem
		static list() {
			return Identity_data( $mol_fetch.json( this.list_url() ) as any ).dataList
				.filter( identity => identity.name !== "Vergilius" )
				.filter( identity => identity.title !== "LCB\nSinner" )
		}
		
		static list_url() {
			return identity_list_url
		}
		
		static art_prefix_url() {
			return identity_art_prefix_url
		}
		
		@ $mol_mem
		json( next?: typeof $kimght_limbus_identity_json.Value ) {
			if ( !next ) {
				next = this.$.$kimght_limbus_identity
					.list()
					.find( next => next.id === this.id() )
			}
			
			return next
		}
		
		id() {
			return 0
		}
		
		title() {
			return this.json()?.title
		}
		
		name() {
			return this.json()?.name
		}
		
		art_base_url() {
			return `${ this.$.$kimght_limbus_identity.art_prefix_url() }/identity_${ this.id() }_base.webp`
		}
		
		art_uptie_url() {
			return `${ this.$.$kimght_limbus_identity.art_prefix_url() }/identity_${ this.id() }_uptie.webp`
		}
		
	}
	
}
