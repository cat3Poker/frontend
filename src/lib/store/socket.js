import { writable } from "svelte/store";

let _socket = {}
export let socket = writable(_socket)
