// src/routes/logout/+server.ts
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  // Remove the authentication cookie (e.g., 'user' or 'session')
  cookies.set('secret', '', {
    path: '/',       // Ensure the path matches the one where the cookie was set
    httpOnly: true,  // Keep the same settings as when you set the cookie
    secure: true,    // Use secure if using HTTPS
    maxAge: 0        // Invalidate the cookie by setting maxAge to 0
  });

  // Optionally, you can redirect to the login page or homepage after logout
  return new Response(null, {
    status: 302,
    headers: {
      location: '/'
    }
  });
};
