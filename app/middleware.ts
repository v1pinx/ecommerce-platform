// middleware.ts
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from './lib/firebase';

export function middleware(req: any) {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
