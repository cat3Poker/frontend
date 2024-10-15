import { writable } from "svelte/store";

let sjbjb = {}
export let app = writable(sjbjb)

let _theme = false
export let theme = writable(_theme)

let _api = {}
export let api_script = writable(_api)

let _chats = []
export let chats = writable(_chats)