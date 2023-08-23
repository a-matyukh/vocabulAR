<div>
	<video bind:this={webcam} width={webcamWidth} height={webcamHeight} autoplay></video>
</div>

<script>
import { onDestroy, onMount } from "svelte"
import { predictions, stream } from "store"
import {load, YOLO_V5_N_COCO_MODEL_CONFIG} from 'yolov5js'

let webcam, webcamWidth = 200, webcamHeight, tick

onMount(async () => {
	const yolov5 = await load(YOLO_V5_N_COCO_MODEL_CONFIG)
	$stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
		//@ts-ignore
        video: navigator.userAgentData.mobile ? {facingMode: { exact: "environment" }} : true
    })
	const settings = $stream.getVideoTracks()[0].getSettings()
	webcamWidth = settings.width
	webcamHeight = settings.height
    webcam.srcObject = $stream
	tick = setInterval(async () => $predictions = await yolov5.detect(webcam), 300)
})
onDestroy(() => {
	clearInterval(tick)
})
</script>