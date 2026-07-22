import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();
  response.headers.set('x-next-pathname', pathname);

  return response;
}

// Specify the paths where the proxy should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory files (e.g., /images/, /fonts/)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/|fonts/).*)',
  ],
};
