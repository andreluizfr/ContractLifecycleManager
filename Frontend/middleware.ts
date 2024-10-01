import { userStore } from '@/infrastructure/store/zustand/userStore';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

  const currentUser = userStore((state) => state.user);

  // Se o usuário estiver autenticado e tentar acessar a página de login, redirecioná-lo para o dashboard
  if (currentUser && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o usuário não estiver autenticado e tentar acessar qualquer página protegida, redirecioná-lo para a página de login
  if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Permitir que a requisição continue para outras rotas não protegidas
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}