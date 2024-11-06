import { writable } from "svelte/store";

let _games = []
export let pokerGames = writable(_games)