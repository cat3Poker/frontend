// Reexport your entry components here
export class APP_script{
    constructor(){
        this.backendURL = ""
        this.isLogin = false
        this.secret = ""
        this.wallet = {
            balance: 10000
        }
    }
    backend_url(url){
        this.backendURL = url
    }
}