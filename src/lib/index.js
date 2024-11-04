import axios from "axios"
import { toast } from 'svelte-sonner' 
import { user } from "$lib/store/profile.js"

export class APP_script{
    constructor(){
        this.url = ""
        this.secret = ""
        this.logo = new URL('$lib/images/catLogo.png', import.meta.url).href
        this.upgrade = [
            {level: 1, status:true,  image: new URL('$lib/images/levels/level1.jpeg', import.meta.url).href},
            {level: 2, status:false, image: new URL('$lib/images/levels/level2.jpeg', import.meta.url).href},
            {level: 3, status:false, image: new URL('$lib/images/levels/level3.jpeg', import.meta.url).href},
            {level: 4, status:false, image: new URL('$lib/images/levels/level4.jpeg', import.meta.url).href},
            {level: 5, status:false, image: new URL('$lib/images/levels/level5.jpeg', import.meta.url).href},
            {level: 6, status:false, image: new URL('$lib/images/levels/level6.jpeg', import.meta.url).href},
            {level: 7, status:false, image: new URL('$lib/images/levels/level7.jpeg', import.meta.url).href},
            {level: 8, status:false, image: new URL('$lib/images/levels/level8.jpeg', import.meta.url).href},
            {level: 9, status:false, image: new URL('$lib/images/levels/level9.jpeg', import.meta.url).href},
            {level: 10, status:false, image: new URL('$lib/images/levels/level10.jpeg', import.meta.url).href},
            {level: 11, status:false, image: new URL('$lib/images/levels/level11.jpeg', import.meta.url).href},
            {level: 12, status:false, image: new URL('$lib/images/levels/level12.jpeg', import.meta.url).href},
        ]
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

    async post(payload, path) {
        (await axios.post(this.url + `/api/${path}`, payload, {
            headers: {
                Authorization: `Bearer ${this.secret}`
            }
        })).data
    }
}