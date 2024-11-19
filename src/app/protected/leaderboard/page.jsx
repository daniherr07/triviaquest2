import styles from "./styles.module.css";
import AudioPlayer from "./AudioPlayer";
import { address } from "@/app/const";
import { cookies } from "next/headers";
  
async function getData() {
  const res = await fetch(`${address}/getLeaderboard`)
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('auth')
  const userData = JSON.parse(authCookie.value)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
  
export default async function Play() {
    const users = await getData()
    console.log(users)
  
    return (
      
    <div className={styles.allContainer}>
      <AudioPlayer></AudioPlayer>
      <div className={styles.cajitaArriba}>
        <div className={`${styles.cajita1} ${styles.cajita}`} />
        <div className={`${styles.cajita2} ${styles.cajita}`} />
        <div className={`${styles.cajita3} ${styles.cajita}`} />
        <div className={`${styles.cajita4} ${styles.cajita}`} />
        <div className={`${styles.cajita5} ${styles.cajita}`} />
      </div>
      <main className={styles.main}>
        <h1 className={styles.headerH1}>Leaderboard</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Nombre</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username} </td>
                  <td>{user.highScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className={styles.play} ><a href="/protected/play">Regresar</a></button>
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
  