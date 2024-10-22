'use client'
import styles from "./page.dania.module.css";
import stylesDaniG from "./page.danig.module.css";
import { act, useState } from "react";



export default function Home() {
  const [active, setActive] = useState(true)
  const color1 = active ? "#000" : "linear-gradient(to right bottom, #cdffd8, #aaf7e0, #89edec, #74e1f7, #72d2ff, #70c6ff, #78b8ff, #88a9fb, #819cf7, #7d8ff2, #7a82ec, #7974e5)"
  const color2 = active ? "linear-gradient(to right bottom, #cdffd8, #aaf7e0, #89edec, #74e1f7, #72d2ff, #70c6ff, #78b8ff, #88a9fb, #819cf7, #7d8ff2, #7a82ec, #7974e5)" : "#000"
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

      <div className={styles.options}>
        <button style={{backgroundImage: color2}} onClick={() => {setActive(!active)}}>Iniciar Sesion</button>
        <button style={{backgroundImage: color1}} onClick={() => {setActive(!active)}}>Registrarse</button>
      </div>
      <form action="" className={styles.forms}>
        <input type="text" placeholder="Nombre de usuario" className={styles.cuadro}/>
        <input type="text" placeholder="Contraseña" className={styles.cuadro}/>
        <button type="submit">Aceptar</button>
      </form>
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
