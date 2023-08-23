// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

	}



	type Mode = "hint" | "guessing"

	type Vocabulary = Word[]
	
	interface Word {
		name: string
		recognized: number // how many times recognized
	}
	
}

export {}