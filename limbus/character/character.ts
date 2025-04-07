namespace $ {
	export const $kimght_limbus_character_meta_json = $mol_data_record( {
		name: $mol_data_string,
		portraitSpritePath: $mol_data_optional( $mol_data_string ),
		nameTagColor: $mol_data_optional( $mol_data_string ),
	} )

	export const $kimght_limbus_character_json = $mol_data_record( {
		id: $mol_data_string,
		name: $mol_data_string,
		nickName: $mol_data_string,
	} )
	
	const Character_data = $mol_data_record( {
		dataList: $mol_data_array( $kimght_limbus_character_json ),
	} )
	
	const character_meta_url = "https://raw.githubusercontent.com/kimght/LimbusStoryImages/main/ScenarioModelCodeAddressable.json"

	const CharacterMeta_data = $mol_data_record( {
		assetData: $mol_data_array( $kimght_limbus_character_meta_json ),
	} )

	const character_urls = {
		en: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/EN/ScenarioModelCodes-AutoCreated.json",
		kr: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/KR/ScenarioModelCodes-AutoCreated.json",
		jp: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/JP/ScenarioModelCodes-AutoCreated.json",
		ru_mtl: "https://raw.githubusercontent.com/kimght/LimbusCompanyRuMTL/main/localize/ScenarioModelCodes-AutoCreated.json",
		ru_crescent: "https://raw.githubusercontent.com/Crescent-Corporation/LimbusCompanyBusRUS/LC_branch_ORIGINAL/Localize/RU/NickName.json",
		ru_divine: "https://raw.githubusercontent.com/Divine-Company/DivineCompany_RussianTranslationDepartment/main/Lang/Russian%20-%20Divine%20Company/ScenarioModelCodes-AutoCreated.json",
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
			return this.json()?.name
		}

		title() {
			return this.json()?.nickName
		}
		
		file_name() {
			const meta = this.$.$kimght_limbus_character.meta()
			const meta_item = meta.find( next => next.name === this.id() )

			return meta_item?.portraitSpritePath ?? "None_Extra"
		}
		
		@ $mol_mem
		json( next? : typeof $kimght_limbus_character_json.Value ) {
			if ( !next ) {
				next = this.$.$kimght_limbus_character
					.list( this.language() )
					.find( next => next.id === this.id() )
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
			return Character_data( $mol_fetch.json(uri) as any ).dataList
		}

		@ $mol_mem
		static meta() {
			return CharacterMeta_data( $mol_fetch.json(character_meta_url) as any ).assetData
		}
	}
}
