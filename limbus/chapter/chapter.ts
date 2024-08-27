namespace $ {
	export const $kimght_limbus_chapter_line_json = $mol_data_record( {
		model: $mol_data_optional( $mol_data_string ),
		place: $mol_data_optional( $mol_data_variant( $mol_data_string, $mol_data_number ) ),
		teller: $mol_data_optional( $mol_data_string ),
		title:  $mol_data_optional( $mol_data_string ),
		content:  $mol_data_optional( $mol_data_string ),
		id: $mol_data_optional( $mol_data_number ),
	} )
	
	const color_markup = /<color=(#\w+)>(.*?)<\/color>/s
	const tag_markup = /<(\w+)[=\w#.]*>(.*?)<\/\1>/s
	
	const chapter_prefix_urls = {
		en: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/EN/StoryData",
		jp: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/JP/StoryData",
		kr: "https://raw.githubusercontent.com/LocalizeLimbusCompany/LocalizeLimbusCompany/main/Localize/KR/StoryData",
		ru_mtl: "https://raw.githubusercontent.com/kimght/LimbusLocalizeRU/release/RU/StoryData",
		ru_crescent: "https://raw.githubusercontent.com/Crescent-Corporation/LimbusCompanyBusRUS/LC_branch_ORIGINAL/Localize/RU/StoryData",
		ru_divine: "https://raw.githubusercontent.com/Divine-Company/DivineCompany_RussianTranslationDepartment/main/Localize/RU/StoryData"
	}
	
	export const $kimght_limbus_chapter_json = $mol_data_array( 
		$kimght_limbus_chapter_line_json
	)
	
	const Chapter_data = $mol_data_record({
		dataList: $kimght_limbus_chapter_json,
	})
	
	export class $kimght_limbus_chapter_line_data extends $mol_object2 {
		@ $mol_mem_key
		static item( { chapter_id, line_id, language } : { chapter_id: string, line_id: number, language: string } ) {
			const obj = new this
			obj.chapter_id = $mol_const( chapter_id )
			obj.line_id = $mol_const( line_id )
			obj.language = $mol_const( language )
			
			return obj
		}
		
		language() {
			return "en"
		}
		
		chapter_id() {
			return ''
		}
		
		line_id() {
			return -1
		}
		
		speaker() {
			if ( this.json()?.model ) {
				return this.$.$kimght_limbus_character.item(
					{ id: this.json()!.model!, language: this.language() }  
				)
			}
		}
		
		teller() {
			if ( this.json()?.teller ) {
				return this.json()!.teller
			}
			
			if ( this.speaker() ) {
				return this.speaker()!.name()
			}
		}
		
		title() {
			if ( this.json()?.teller ) {
				return this.json()!.teller
			}

			if ( this.json()?.model ) {
				return this.speaker()!.title()
			}
		}
		
		place() {
			return this.json()?.place
		}
		
		@ $mol_mem
		text() {
			return this.json()?.content?.replace( tag_markup, ( _, tag, text ) => text )
		}
		
		@ $mol_mem
		color() {
			return this.json()?.content?.match( color_markup )?.[1]
		}
		
		@ $mol_mem
		json( next? : typeof $kimght_limbus_chapter_line_json.Value ) {
			return next
		}
		
		@ $mol_mem_key
		static list( { chapter_id, language } : { chapter_id : string, language : string } ) {
			// const uri = `/chapter/${ chapterId }.json`
			if ( !( language in chapter_prefix_urls ) ) {
				console.warn(`Language ${ language } is not supported. Using English fallback.`)
				language = "en"
			}
			
			const uri = `${ chapter_prefix_urls[ language as keyof typeof chapter_prefix_urls ] }/${ chapter_id }.json`
			const json = Chapter_data( $mol_fetch.json( uri ) as any ).dataList

			let result = []
			let line_index = 0
			for ( const line of json ) {
				if ( !line.content ) continue
				if ( line.id && line.id! === -1 ) continue
				
				this.item( { chapter_id, language, line_id: line_index } ).json( line )
				result.push( this.item( { chapter_id, language, line_id: line_index } ) )
				line_index++
			}
			
			return result
		}
		
		@ $mol_mem_key
		static length( { chapter_id, language } : { chapter_id : string, language: string } ) {
			return this.list( { chapter_id, language } ).length
		}
	}
}
