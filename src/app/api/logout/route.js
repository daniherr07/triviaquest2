// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    cookies().set('auth', '', {
      expires: new Date(0),
      path: '/',
    })
    return NextResponse.redirect(new URL('/', request.url))

    
}
