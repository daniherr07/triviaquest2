// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { address } from '@/app/const';

export async function POST(request) {
    // Obtener los datos del formulario en JSON
    const formData = await request.json();
    console.log(formData)

    // Hacer un POST a tu backend
    const backendResponse = await fetch(`${address}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Manejar la respuesta del backend si es necesario
    const backendData = await backendResponse.json();
    console.log(backendData)

    if (backendData.authorized) {

      const response = NextResponse.json({ toPlay: true});
      const userData = {
        auth: true,
        userName: backendData.user,
        high: backendData.highScore,
      };
      response.cookies.set('auth', JSON.stringify(userData), { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 });
      return response;

    } else{
      return NextResponse.json({toError: true});
    }

    
}
