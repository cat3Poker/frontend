import { redirect } from '@sveltejs/kit';

export function load({url}) {
  redirect(302,`/login`)
}