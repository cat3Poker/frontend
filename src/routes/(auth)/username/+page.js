import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export async function load({ route }) {
    let _preLogin = ""
    if(browser){
         _preLogin =  JSON.parse(sessionStorage.getItem("pre_login"))
    }
    return {_preLogin}
}
