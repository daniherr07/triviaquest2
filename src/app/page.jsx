
import styles from "./page.module.css";
export default function Home() {
  return (
  <>
  <div className="cajitas1"></div>
  <main className={styles.main}>
    <h1 className={styles.headerH1}>TriviaQuest</h1>
    <div className="options">
      <button>Iniciar Sesion</button>
      <button>Registrarse</button>
    </div>

    <form action="">
      <input type="text" placeholder="nombre"/>
      <input type="text" placeholder="contraseña"/>

      <button type="submit">Aceptar</button>
    </form>
  </main>
  <div className="cajitas2"></div>
  </>
  );
}
