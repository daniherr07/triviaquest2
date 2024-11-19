import { NextResponse } from 'next/server';

export function middleware(request) {
    // Verificar si la cookie "auth" existe
    const authCookie = request.cookies.get('auth');
    
    // Si estamos en la ruta raíz y la cookie existe, redirigir al dashboard
    if (request.nextUrl.pathname === '/' && authCookie) {
        return NextResponse.redirect(new URL('/protected/play', request.url));
    }
    
    // Si estamos en una ruta protegida y la cookie no existe, redirigir a la página de login
    if (request.nextUrl.pathname.startsWith('/protected') && !authCookie) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // En cualquier otro caso, permitir la solicitud
    return NextResponse.next();
}

// Aplica el middleware en la ruta raíz y en las rutas protegidas
export const config = {
    matcher: ['/', '/protected/:path*'],
};