import axios from "axios"
import { toast } from 'svelte-sonner'
import { setCookie } from "$lib/store/cookies";
import { goto } from "$app/navigation";

export class auth_Script {
    constructor(){
        this.email = ""
        this.password = ""
        this.url = ""
        this.status = ""
    }
    setBackendUrl(url){
        this.url = url
    }
    async handleSignUp(auth){ 
        let path = "/auth/signup"
        await axios.post(this.url + path, {auth})
        .then((res)=>{
            sessionStorage.setItem("pre_login", JSON.stringify(res.data))
            this.status = "success"
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return {status: this.status}
    }
    async handleLogin(auth){ 
        let path = "/auth/login"
        await axios.post(this.url + path, {auth})
        .then((res)=>{
            if(res.data.user){
                setCookie("secret", res.data.token)
                this.status = "success"
            }else{
                window.location.href = "/username"
            }
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return {status: this.status}
    }
    async setUserName(data){
        let path = "/auth/set-username"
        await axios.post(this.url + path, {data})
        .then((res)=>{
            setCookie("secret", res.data.token)
            sessionStorage.removeItem("pre_login")
            this.status = "success"
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return {status: this.status}
    }
    async fetchCountry(){
        let response = ""
        await axios.get(`https://ipinfo.io/json?token=0d65c9c7910c63`)
        .then((res)=>{
            response = res.data
        })
        .catch((err)=>{
            toast.error(err.response.data)
        })
        return response
    }
    async resetPassword(email){
        let path = "/auth/reset-password"
        await axios.post(this.url + path, {email})
        .then((res)=>{
            toast.success("Check your email to reset your password")
            this.status = "success"
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return {status: this.status}
    }
    async changePassword(auth){
        let path = "/auth/change-password"
        await axios.post(this.url + path, {auth})
        .then((res)=>{
            toast.success(res.data)
            this.status = "success"
        })
        .catch((error)=>{
            this.status = "failed"
            toast.error(error.response.data.error)
        })
        return {status: this.status}
    }
}