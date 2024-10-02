namespace $ {
	export const $kimght_limbus_note_meta_json = $mol_data_record( {
		chapter_files: $mol_data_array( $mol_data_string ),
		notes: $mol_data_array(
			$mol_data_record( {
				path: $mol_data_array( $mol_data_string ),
				notes: $mol_data_array( $mol_data_string ),
			} )
		)
	} )
	
	export const $kimght_limbus_note_json = $mol_data_record( {
		id: $mol_data_string,
		desc: $mol_data_string,
	} )

	const Notes_data = $mol_data_record( {
		dataList: $mol_data_array( $kimght_limbus_note_json ),
	} )

	const notes_meta_url = "https://gist.githubusercontent.com/kimght/e5d67c491961eae85f50765a1f337356/raw/dante_notes.json"
	
	const notes_prefix_urls = {
		en: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/EN",
		jp: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/JP",
		kr: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/KR",
		ru_mtl: "https://raw.githubusercontent.com/kimght/LimbusLocalizeRU/release/RU",
		ru_crescent: "https://raw.githubusercontent.com/Crescent-Corporation/LimbusCompanyBusRUS/LC_branch_ORIGINAL/Localize/RU",
		ru_divine: "https://raw.githubusercontent.com/Divine-Company/DivineCompany_RussianTranslationDepartment/main/Localize/RU"
	}

	export class $kimght_limbus_note_data extends $mol_object2 {
		@ $mol_mem_key
		static item( { id, language } : { language : string, id : string } ) {
			const obj = new this
			obj.id = $mol_const( id )
			obj.language = $mol_const( language )
			return obj
		}

		id() {
			return ""
		}

		language() {
			return "en"
		}

		desc() {
			return this.json()?.desc || ""
		}
		
		@ $mol_mem
		prefix() {
			const meta = this.$.$kimght_limbus_note_data.meta()
			const category = meta.notes.find( note => note.notes.includes( this.id() ) )
			if ( !category ) return ""
			
			return category.path.join( "/" )
		}

		@ $mol_mem
		json( next? : typeof $kimght_limbus_note_json.Value ) {
			if ( !next ) {
				next = $kimght_limbus_note_data.all( this.language() )
					.find( note => note.id === this.id() )
			}

			return next
		}

		@ $mol_mem_key
		static all( language: string ) {
			if ( !( language in notes_prefix_urls ) ) {
				console.warn(`Language ${ language } is not supported. Using English fallback.`)
				language = "en"
			}

			const uri = notes_prefix_urls[ language as keyof typeof notes_prefix_urls ]
			const chapter_files = $kimght_limbus_note_data.meta().chapter_files
			
			let result = [] as typeof $kimght_limbus_note_json.Value[]
			for ( const file of chapter_files ) {
				const url = `${uri}/${file}`
				const data = Notes_data($mol_fetch.json(url) as any).dataList
				result = [ ...result, ...data ]
			}
			
			return result
		}
		
		@ $mol_mem_key
		static list( { language, prefix }: { language: string, prefix: string | string[] } ) {
			if ( !( language in notes_prefix_urls ) ) {
				console.warn(`Language ${ language } is not supported. Using English fallback.`)
				language = "en"
			}
			
			if ( prefix instanceof Array ) {
				prefix = prefix.join( "/" )
			}
			
			const meta = this.$.$kimght_limbus_note_data.meta()
			const category = meta.notes.find( note => note.path.join( "/" ) === prefix )
			
			if ( !category ) return []
			
			return category.notes.map( id => this.item( { id, language } ) )
		}
		
		@ $mol_mem
		static meta() {
			return $kimght_limbus_note_meta_json( 
				$mol_fetch.json( notes_meta_url ) as any 
			)
		}
	}
}
