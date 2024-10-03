import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
//import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {

  // cookies().set({
  //   name: 'name',
  //   value: 'lee',
  //   secure: true,
  //   httpOnly: true,
  //   path: '/',
  //   maxAge: 0
  // });

  // const hasCookie = cookieStore.has('theme')
  // cookies().delete('name')

  const currentUser = request.cookies.get('X-Refresh-Token')?.value;

  if (currentUser && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

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