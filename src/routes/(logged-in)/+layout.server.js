import { redirect } from '@sveltejs/kit';
export function load({ cookies, url }) {
	if (!cookies.get('secret')) {
		throw redirect(303, `/welcome`);
	}
	return {url: url.pathname}
}