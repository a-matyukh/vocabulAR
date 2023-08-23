<svelte:head>
	<title>Discover</title>
</svelte:head>

<Camera />
	{#each $predictions as prediction}
		<Detection {prediction} />
	{:else}
		search detections...
	{/each}
<label>show hints <input type="checkbox" bind:checked={$show_hints}></label>

<style>
label {
	position: absolute;
	right: 40px;
	bottom: 40px;
	background-color: white;
	padding: 20px;
	border-radius: 30px;
}
</style>
<script>
import { show_hints, predictions } from "store"
import Detection from "./Detection.svelte"
import Camera from "./Camera.svelte"
</script>