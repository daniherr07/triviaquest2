'use client'
import styles from "./page.dania.module.css";
import stylesDaniG from "./page.danig.module.css";
import { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function Search() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const registered = searchParams.get('registered')
 
  return (
      <>
      {error && <p style={{ color: 'red' }}>Hubo un error: {error}</p>}
      {registered && <p style={{ color: 'green' }}>Registrado exitosamente! Por favor inicia sesión</p>}
      </>
  )
}

export default function Home() {
  const router = useRouter()

  const [active, setActive] = useState(true)
  const [formData1, setFormData1] = useState({
    userName: '',
    password: '',
  });

  const [formData2, setFormData2] = useState({
    userName: '',
    password: '',
    password2: '',
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    console.log("Llego aqui")

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData1),
    });

    const result = await response.json();
    console.log(result)

    if (result.toPlay) {
      router.push('/protected/play');
    }

    if (result.toError) {
      router.push('/?error=Usuario%20o%20contraseña%20incorrectos');
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData2),
    });

    const result = await response.json();

    if (result.registered) {
      router.push('/?registered=true');
    }

    if (result.toError) {
      router.push('/?error=Usuario%20ya%20registrado');
    }
  };

  const clearForms = () => {
    setFormData1({
      userName: '',
      password: '',
    });
    setFormData2({
      userName: '',
      password: '',
      password2: '',
    });
  };

  const handleSetActive = (boolean) => {
    setActive(boolean);
    clearForms();
  };

  return (
    <div className={stylesDaniG.allContainer}>
      <div className={stylesDaniG.cajitaArriba}>
        <div className={`${stylesDaniG.cajita1} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita2} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita3} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita4} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita5} ${stylesDaniG.cajita}`} />
      </div>
      <main className={styles.main}>
        <h1 className={styles.headerH1}>TriviaQuest</h1>
        <Suspense>
          <Search />
        </Suspense>
        

        <div className={stylesDaniG.options}>
          <div 
            style={active ? {left: "0"} : {left: "50%"}}
            className={`${stylesDaniG.slider} ${active ? stylesDaniG.active : null}`}
          />
          <button className={`${stylesDaniG.button}`} onClick={() => {handleSetActive(true)}}>Iniciar Sesion</button>
          <button className={`${stylesDaniG.button}`} onClick={() => {handleSetActive(false)}}>Registrarse</button>
        </div>

        {
          active ?
          <form onSubmit={handleSubmit1} className={styles.forms}>
            <input required type="text" placeholder="Nombre de usuario" name="userName" onChange={handleChange1} value={formData1.userName} className={styles.cuadro}/>
            <input required type="password" placeholder="Contraseña" name="password" onChange={handleChange1} value={formData1.password} className={styles.cuadro}/>
            <button type="submit" className={stylesDaniG.submit}>Iniciar Sesion</button>
          </form>
          :
          <form onSubmit={handleSubmit2} className={styles.forms}>
            <input required type="text" placeholder="Nombre de usuario" name="userName" onChange={handleChange2} value={formData2.userName} className={styles.cuadro}/>
            <input required type="password" placeholder="Contraseña" name="password" onChange={handleChange2} value={formData2.password} className={styles.cuadro}/>
            <input required type="password" placeholder="Verificar Contraseña" onChange={handleChange2} value={formData2.password2} name="password2" className={styles.cuadro}/>
            <button type="submit" className={stylesDaniG.submit}>Registrarse</button>
          </form>
        }
      </main>
      <div className={stylesDaniG.cajitaAbajo}>
        <div className={`${stylesDaniG.cajita1} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita2} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita3} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita4} ${stylesDaniG.cajita}`} />
        <div className={`${stylesDaniG.cajita5} ${stylesDaniG.cajita}`} />
      </div>
    </div>
  );
}