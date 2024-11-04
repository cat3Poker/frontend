import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
/** @type {import('./$types.js').PageLoad} */
export async function load({  }) {
    let _preLogin = ""
    if(browser){
         _preLogin =  JSON.parse(sessionStorage.getItem("pre_login"))
        if(!_preLogin){
            throw redirect(303, `/signup`);
        }
    }
    return {_preLogin}
}
