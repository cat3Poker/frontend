import type { Socket } from "socket.io-client";
import { writable } from "svelte/store";
type SocketData = {
  io: Socket,
  request: (event: string, data?: { [k: string]: unknown }) => Promise<unknown>
} | null
const _socketData: SocketData  = null
export const socketData = writable<SocketData>(_socketData)

let _socket = {}
export let socket = writable(_socket)