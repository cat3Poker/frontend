import { browser } from '$app/environment';
import { APP_script } from '$lib/appscript.js';
import { auth_Script } from './(auth)/auth.js';
import { auth , app} from "$lib/store/activities.js";
import { getCookie } from "$lib/store/cookies";

/** @type {import('./$types').PageLoad} */
export async function load({ route }) {
    const _apiScript = new APP_script()
    const _authScript = new auth_Script()
    if(browser){
        setAPI_url(_apiScript, _authScript )
        const _secret = getCookie("secret")
        if(_secret){
          await  _apiScript.getUser(_secret)
        }
    }
    return 
}


const setAPI_url = ((_apiScript, _authScript)=>{
    let localhostUrl = "http://localhost:8000"
    let remoteUrl = "https://cat3poker-d07112c3d84c.herokuapp.com"
    const _api = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? localhostUrl : remoteUrl
    _apiScript.backend_url(_api) 
    _authScript.setBackendUrl(_api)
    auth.set(_authScript)
    app.set(_apiScript)
})