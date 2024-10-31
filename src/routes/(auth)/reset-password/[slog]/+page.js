/** @type {import('../$types').PageLoad} */
export async function load({ params }) {
  const slog = params.slog
  return {slog}
}