// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { address } from '@/app/const';
import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')
    const userData = JSON.parse(authCookie.value)  
    const points = await request.json();

    const data = {
        username: userData.userName,
        points: points
      }

    const backendResponse = await fetch(`${address}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const backendData = await backendResponse.json();

    if (backendData.updated) {

      const response = NextResponse.json({ updated: true});
      const userData = {
        auth: true,
        userName: data.username,
        high: backendData.points,
      };
      response.cookies.set('auth', JSON.stringify(userData), { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 });
      return response;

    } else{
      return NextResponse.json({toError: true});
    }

    
}
