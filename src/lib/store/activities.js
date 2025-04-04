import { writable} from "svelte/store"

let _error = null
export let error = writable(_error)

let _app = null
export let app = writable(_app)

let _message = []

export let message = writable(_message)

let _loading = false
export let loading = writable(_loading)

let _isLoggin = false
export let isLoggin = writable(_isLoggin)

let _auth = false
export let auth = writable(_auth)

export const handleResposeMessages = ((type, res)=>{
    message.set([{type: type, message: res}])
    loading.set(false)
    setTimeout(()=>{
        message.set([])
    },14000)
})