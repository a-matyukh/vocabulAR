import { writable } from "svelte/store";
import v from './vocabulary'

export const vocabulary = writable(v)
export const show_hints = writable(true)
export const predictions = writable([])
export const snapshot = writable(null)
export const stream = writable(null)
export const quiz_label = writable("")

export function recognizeWord(word) {
    let finded_word
    vocabulary.update(v => {
        v = v.map(w => {
            if (w.name === word) {
                w.recognized++
                finded_word = w
            }
            return w
        })
        v.sort((a, b) => {
            if (a.recognized < b.recognized) return 1
            if (a.recognized > b.recognized) return -1
            return 0;
        })
        return v
    })
    return finded_word
}