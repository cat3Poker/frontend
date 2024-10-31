import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	if (cookies.get('secret')) {
		throw redirect(303, `/home`);
	}
	return {url: url.pathname}
}