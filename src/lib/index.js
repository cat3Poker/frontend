import axios from "axios"
import { toast } from 'svelte-sonner' 
import { user } from "$lib/store/profile.js"

export class APP_script{
    constructor(){
        this.url = ""
        this.secret = ""
        this.logo = '/assets/logo.png'
        this.user = null
        this.upgrade = [
            {level: 1, status:true,  image: "/assets/levels/level1.jpeg"},
            {level: 2, status:false, image: "/assets/levels/level2.jpeg"},
            {level: 3, status:false, image: "/assets/levels/level3.jpeg"},
            {level: 4, status:false, image: "/assets/levels/level4.jpeg"},
            {level: 5, status:false, image: "/assets/levels/level5.jpeg"},
            {level: 6, status:false, image: "/assets/levels/level6.jpeg"},
            {level: 7, status:false, image: "/assets/levels/level7.jpeg"},
            {level: 8, status:false, image: "/assets/levels/level8.jpeg"},
            {level: 9, status:false, image: "/assets/levels/level9.jpeg"},
            {level: 10, status:false, image: "/assets/levels/level10.jpeg"},
            {level: 11, status:false, image: "/assets/levels/level11.jpeg"},
            {level: 12, status:false, image: "/assets/levels/level12.jpeg"},
        ]
    }
    backend_url(url){
        this.url = url
    }
    async copyToClipboard(secret){
        try {
            await navigator.clipboard.writeText(secret);
            toast.success('Copied to clipboard');
        } catch (err) {
            toast.error('Failed to copy');
        }
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
            this.user = res.data.user
            this.status = "success"
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
    async generate2FAsecrete(){
        let response = ""
        let path = "/auth/generate-secret/" + this.user?.user_id
        await axios.get(this.url + path, {
            headers:{
                Authorization: `Bearer ${this.secret}`
            }
        })
        .then((res)=>{
            this.status = "success"
            response = res.data
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return { response,status:this.status }
    }
    async handleverifyFA_Token(code){
        let path = "/auth/verify-token/" + this.user?.user_id
        await axios.post(this.url + path, {code})
        .then((res)=>{
            this.user = res.data
            user.set(this.user)
            this.status = "success"
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return { status:this.status }
    }
    async changePassword(password){
        let path = "/api/profile/change-password"
        await axios.post(this.url + path,{password}, {
            headers:{
                Authorization: `Bearer ${this.secret}`
            }
        })
        .then((res)=>{
            this.status = "success"
            toast.success(res.data)
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return { status:this.status }
    }
    async setProfileDetails(data){
        let path = "/api/profile/setProfileDetails"
        await axios.post(this.url + path,{details: data}, {
            headers:{
                Authorization: `Bearer ${this.secret}`
            }
        })
        .then((res)=>{
            this.status = "success"
            user.set(res.data)
            toast.success("Profile details updated")
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return { status:this.status }
    }
}