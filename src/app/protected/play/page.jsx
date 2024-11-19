import styles from "./styles.module.css";
import { cookies } from 'next/headers'
  
  
export default async function Play() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('auth')
  const userData = JSON.parse(authCookie.value)

  
    return (
      
    <div className={styles.allContainer}>

      <div className={styles.cajitaArriba}>
        <div className={`${styles.cajita1} ${styles.cajita}`} />
        <div className={`${styles.cajita2} ${styles.cajita}`} />
        <div className={`${styles.cajita3} ${styles.cajita}`} />
        <div className={`${styles.cajita4} ${styles.cajita}`} />
        <div className={`${styles.cajita5} ${styles.cajita}`} />
      </div>
      <main className={styles.main}>
        <h1 className={styles.headerH1}>TriviaQuest</h1>
        <h2 className={styles.text}>Hola de nuevo <span className={styles.userName}>{userData.userName}</span></h2>
        <button type="button" className={styles.play} ><a href="/protected/trivia">Jugar</a></button>
        <h2 className={styles.text}>Puntaje maximo: {userData.high}</h2>
        <button type="button" className={styles.faq}><a href="/api/logout">Cerrar Sesion</a></button>
      </main>


      <div className={styles.cajitaAbajo}>
        <div className={`${styles.cajita1} ${styles.cajita}`} />
        <div className={`${styles.cajita2} ${styles.cajita}`} />
        <div className={`${styles.cajita3} ${styles.cajita}`} />
        <div className={`${styles.cajita4} ${styles.cajita}`} />
        <div className={`${styles.cajita5} ${styles.cajita}`} />
      </div>
    </div>
    );
  }
  