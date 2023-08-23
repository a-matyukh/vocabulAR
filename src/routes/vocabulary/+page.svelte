<svelte:head>
	<title>Vocabulary</title>
</svelte:head>

<h3>Basic 80 words</h3>
<main>
	{#each $vocabulary as word}
		<Word {word} />
	{/each}
</main>

<style>
h3 {
	text-align: center;
}
main {
	padding: 0 30px;
}
</style>
<script>
import Word from './Word.svelte'
import { vocabulary } from "store"
</script>