namespace $.$$ {
	
	const Chapters_data = $mol_data_record({
		chapters: $mol_data_array(
			$mol_data_record( {
				name: $mol_data_string,
				subtitle: $mol_data_string,
				episodes: $mol_data_array( $mol_data_string )
			} ) 
		)
	})
	
	export class $kimght_limbus_story extends $.$kimght_limbus_story {
		
		@ $mol_mem_key
		episode_chapter( episode_id: string ) {
			const chapter_index = this.chapters()
				.map( chapter => chapter.episodes.indexOf( episode_id ) )
				.findIndex( index => index !== -1 )
			if ( chapter_index === -1 ) return null
			return this.chapters()[ chapter_index ]
		}
		
		current_chapter() {
			if ( this.chapter_active() !== null ) {
				return [ this.Chapter_page( this.chapter_active() ) ]
			}
			
			return []
		}
		
		@ $mol_mem
		pages() {
			return [
				this.Chapters_list_page(),
				...this.current_chapter()
			]
		}
		
		@ $mol_mem_key
		tag_name( id: any ) {
			const chapter = this.chapters()[ +id[0] ]
			return chapter.name
		}
		
		@ $mol_mem
		chapter_active() {
			const slug = this.$.$mol_state_arg.value( "chapter" )
			if ( !slug ) return null
			
			return slug
		}

		@ $mol_mem_key
		item_title( path: readonly string[] ) {
			const [, episode] = path.at(-1)!.split( "_" )
			
			if ( path.length == 1 ) {
				return this.episode_chapter( episode )?.name ?? `Эпизод ${ episode }`
			}
			
			const [ chapter_id ] = path[0][0].split( "_", 2 )
			
			const chapter = this.chapters()[ +chapter_id ]
			const episode_no = chapter.episodes.indexOf( episode )
			return `Эпизод ${ episode_no + 1 }`
		}
		
		chapters_url() {
			return "https://gist.githubusercontent.com/kimght/7049a925e4d0c33517cde112103758f8/raw/chapters_list.json"
		}
		
		@ $mol_mem
		chapters() {
			return Chapters_data( $mol_fetch.json( this.chapters_url() ) as any ).chapters
		}
		
		@ $mol_mem
		toc() {
			const episodes: { [key: string]: string[] } = {}
			let current = 0
			for (let i = 0; i < this.chapters().length; i++) {
				const chapter = this.chapters()[i]
				const chapterIndex = `${i}`.padStart(5, "0")
				for (const episode of chapter.episodes) {
					const index = `${current++}`.padStart(5, "0")
					episodes[`${index}_${episode}`] = [chapterIndex]
				}
			}
			
			return episodes
		}
		
		@ $mol_mem_key
		chapter_slug( path: readonly string[] ) {
			const [, episode] = path.at(-1)!.split( "_", 2 )
			return episode
		}
		
		chapter_id( id: string ) {
			return id
		}
		
		@ $mol_mem
		chapter_title( id: any ) {
			const chapter = this.episode_chapter( id )
			if ( !chapter ) return ""
			
			const episode_no = chapter.episodes.indexOf( id )
			return `${ chapter.name } - Эпизод ${ episode_no + 1 }`
		}

		@ $mol_mem
		next_link( id: any ) {
			const chapter = this.episode_chapter( id )
			if ( !chapter ) return null

			const next_index = chapter.episodes.indexOf( id ) + 1
			if ( next_index >= chapter.episodes.length ) return null
			return this.Chapter_link( chapter.episodes[ next_index ] )
		}
	}
}
