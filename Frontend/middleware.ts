import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  const currentUser = request.cookies.get('X-Refresh-Token')?.value;

  if (!currentUser && !isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

const publicRoutes = [
  '/login',
  '/cadastro'
];

const isPublicRoute = (pathname: string) => publicRoutes.some(r => pathname.startsWith(r));