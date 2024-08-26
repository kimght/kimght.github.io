namespace $ {
	export const $kimght_limbus_character_json = $mol_data_record( {
		name: $mol_data_string,
		krname: $mol_data_string,
		enname: $mol_data_string,
		jpname: $mol_data_string,
		portraitSpritePath: $mol_data_string,
		nickName: $mol_data_string,
		jpNickName: $mol_data_string,
		enNickName: $mol_data_string,
	} )
	
	const Character_data = $mol_data_record( {
		assetData: $mol_data_array( $kimght_limbus_character_json ),
	} )
	
	const character_urls = {
		en: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/NickName.json",
		kr: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/NickName.json",
		jp: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/NickName.json",
		ru_mtl: "https://raw.githubusercontent.com/kimght/LimbusLocalizeRU/release/RU/NickName.json",
		ru_crescent: "https://raw.githubusercontent.com/Crescent-Corporation/LimbusCompanyBusRUS/LC_branch_ORIGINAL/Localize/RU/NickName.json",
	}
	
	export class $kimght_limbus_character extends $mol_object2 {
		@ $mol_mem_key
		static item( { id, language } : { language : string, id : string } ) {
			const obj = new this
			obj.id = $mol_const( id )
			obj.language = $mol_const( language )
			return obj
		}
		
		id() {
			return ''
		}
		
		language() {
			return "en"
		}
		
		name() {
			if ( this.language() === "en" ) {
				return this.json()?.enname
			}
			
			if ( this.language() === "jp" ) {
				return this.json()?.jpname
			}
			
			return this.json()?.krname
		}

		title() {
			if ( this.language() === "en" ) {
				return this.json()?.enNickName
			}
			
			if ( this.language() === "jp" ) {
				return this.json()?.jpNickName
			}
			
			return this.json()?.nickName
		}
		
		file_name() {
			return this.json()?.portraitSpritePath
		}
		
		@ $mol_mem
		json( next? : typeof $kimght_limbus_character_json.Value ) {
			if ( !next ) {
				next = this.$.$kimght_limbus_character
					.list( this.language() )
					.find( next => next.name === this.id() )
			}
			
			return next
		}
		
		@ $mol_mem_key
		static list( language: string ) {
			// const uri = `/characters/${language}.json`
			if ( !( language in character_urls ) ) {
				console.warn(`Language ${ language } is not supported. Using English fallback.`)
				language = "en"
			}
			
			const uri = character_urls[ language as keyof typeof character_urls ]
			return Character_data( $mol_fetch.json(uri) as any ).assetData
		}
	}
}
