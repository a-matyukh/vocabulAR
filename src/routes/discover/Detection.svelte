<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
    on:click={goToQuiz}>
	{#if $show_hints}
		<p>{label}</p>
	{:else}
		<p><button on:click={goToQuiz}>?</button></p>
	{/if}
</div>

<style>
div {
    position: absolute;
    outline: 5px solid blue;
    outline-offset: -5px;
    transition: .2s;
}
p {
    position: relative;
    top: -40px;
    background-color: #fff;
    padding: 10px;
    margin: 0;
}
button {
    width: 100%;
}
</style>
<script>
import { show_hints, stream, snapshot, quiz_label } from "store"
import { goto } from '$app/navigation'

export let prediction
$: x = prediction.x
$: y = prediction.y
$: width = prediction.width
$: height = prediction.height
$: label = prediction.class

const cropCanvas = async (imageBitmap,left,top,width,height) => {
    let destCanvas = document.createElement('canvas')
    destCanvas.width = width
    destCanvas.height = height
    const ctx = destCanvas.getContext("2d")
    ctx.drawImage(imageBitmap,
        left,top,width,height,  // source rect with content to crop
        0,0,width,height)      // newCanvas, same size as source rect
    return await createImageBitmap(destCanvas)    
}
async function goToQuiz() {
    if ($show_hints) return
    const track = $stream.getVideoTracks()[0]
    //@ts-ignore
    let imageCapture = new ImageCapture(track)
    const iBitmap = await imageCapture.grabFrame()
    $snapshot = await cropCanvas(iBitmap, x, y, width, height)
    $quiz_label = label
    goto(`/quiz`)
}

</script>