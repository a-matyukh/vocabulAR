import COCO_LABELS from "./coco-labels"

let vocabulary = []

for (const label of COCO_LABELS) {
	vocabulary.push({
		name: label,
		recognized: 0
	})
}

export default vocabulary