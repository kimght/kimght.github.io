namespace $.$$ {
	
	export class $kimght_limbus_chapter_line extends $.$kimght_limbus_chapter_line {
		name() {
			return this.line().teller() || ""
		}
		
		place() {
			return this.line().place() || ""
		}
		
		location() {
			return `📍 ${ this.place() }`
		}
		
		language() {
			return this.show_original() ? "en" : "ru-mtl"
		}
		
		@ $mol_mem
		rows() {
			return [
				...( this.place() ? [ this.Place() ] : [] ),
				this.Content(),
			]
		}
		
		picture_uri() {
			let file_name = this.line().speaker()?.file_name()

			if ( !file_name ) {
				if ( this.line().teller() ) {
					file_name = "None_Extra"
				} else {
					return ""
				}
			}
			
			return `https://raw.githubusercontent.com/kimght/LimbusStoryImages/main/${file_name}.webp`
		}
		
		text() {
			return this.line().text() || ""
		}
		
		text_color() {
			return this.line().color() || "inherit"
		}
		
		@ $mol_mem
		content() {
			return [
				...( this.picture_uri() ? [ this.Speaker() ] : []),
				...( this.text() ? [ this.Text() ] : [] ),
			]
		}
	}
	
}
