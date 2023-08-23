<script lang="ts">
export let word: Word
</script>

<p>
	<span>{word.name}</span>
	<span>{word.recognized}</span>
</p>

<style>
p {
	display: flex;
	justify-content: space-between;
	padding: 0.5em;
}
</style>