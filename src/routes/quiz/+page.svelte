<svelte:head>
	<title>Quiz</title>
</svelte:head>

<main>
	{#if $snapshot}
		<canvas bind:this={canvas} width="640" height="480"></canvas>
	{/if}
	<p>
		<button on:click={() => quiz_type = "input"}
			class:current={quiz_type === "input"}>type image word</button>
		or <button
			on:click={selectWord}
			class:current={quiz_type === "select"}
		>select from variants</button></p>
	<p>
	{#if quiz_type === "input"}
		<input type="text" bind:value={answer}>
	{:else if quiz_type === "select"}
		<select bind:value={answer}>
			{#each select_variants as word}
				<option value="{word}">{word}</option>
			{/each}
		</select>
	{/if}
	</p>
	<p><button on:click={checkAnswer}>answer</button></p>
</main>

<style>
main {
	padding: 20px;
}
button.current {
	outline: 3px solid orange;
}
canvas {
	width: 300px;
}
</style>
<script>
import { snapshot, quiz_label, recognizeWord, vocabulary } from "store"
import { onMount } from "svelte"
import { goto } from '$app/navigation'

let canvas = null
let answer = ""
let quiz_type = "input"
let select_variants = ["person", "apple"]

function getRandomizedWordList() {
	let arr = []
	while (arr.length < 5) {
		let r = Math.floor(Math.random() * 100)
		if (arr.indexOf(r) === -1 && r < 80) arr.push(r)
	}
	let n = Math.floor(Math.random() * 100)
	while (n >= 5) {
		n = Math.floor(Math.random() * 100)
	}
	select_variants = []
	arr.forEach(v => select_variants.push($vocabulary[v].name))
	select_variants[n] = $quiz_label
}
function selectWord() {
	getRandomizedWordList()
	quiz_type = "select"
}
function checkAnswer() {
	if ($quiz_label === answer) {
		const word = recognizeWord(answer)
		//@ts-ignore
		alert(`Correct! You recognize ${word.name} ${word.recognized} times`)
		goto(`/discover`)
	} else {
		alert("not correct!")
	}
}

onMount(() => {
	if (canvas) {
		const ctx = canvas.getContext("2d")
		ctx.drawImage($snapshot, 0, 0)
	}
})
</script>