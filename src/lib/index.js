import axios from "axios"
import { toast } from 'svelte-sonner' 
import { user } from "$lib/store/profile.js"

export class APP_script{
    constructor(){
        this.url = ""
        this.secret = ""
    }
    backend_url(url){
        this.url = url
    }
    async getUser(secret){
        this.secret = secret
        let path = "/api/profile/user"
        await axios.get(this.url + path, {
            headers:{
                Authorization: `Bearer ${this.secret}`
            }
        })
        .then((res)=>{
            user.set(res.data.user)
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
    }

}