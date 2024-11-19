// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { address } from '@/app/const';

export async function POST(request) {
    // Obtener los datos del formulario en JSON
    const formData = await request.json();
    console.log('Datos del formulario:', formData);

    // Hacer un POST a tu backend
    const backendResponse = await fetch(`${address}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Manejar la respuesta del backend si es necesario
    const backendData = await backendResponse.json();

    if (backendData.registered) {

      const response = NextResponse.json({ registered: true});
      return response;

    } else{
      return NextResponse.json({toError: true});
    }

    
}
