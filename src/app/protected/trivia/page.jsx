'use client'

import { address } from "@/app/const";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import styles from "./styles.module.css";
import Image from "next/image";
  
export default function Play() {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true);
  const [incorrect, setIncorrect] = useState(false)
  const [points, setPoints] = useState(0)
  const [error, setError] = useState(null);
  const [correct, setCorrect] = useState(false)
  const [cheats, setCheats] = useState(3)
  const [selectedQuestion, setSelectedQuestion] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${address}/getQuestions`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once.

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const handleWrong = () =>{
    setIncorrect(true)
  }

  const handleCorrect = () => {
    setCorrect(true)
    setPoints(points + 10)
  }

  const nextCurrent = () => {
    setCorrect(false)
    setCurrent(current + 1)
    setSelectedQuestion(false)
  }

  const handleCheat = () => {
    if (selectedQuestion) {
      return
    }

    if (cheats > 0) {
      setCheats(cheats - 1);
      setSelectedQuestion(true)

      
    } else{
      return
    }
  }


  const handleSave = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: points,
    });

    const result = await response.json();

    if (result.updated) {
      router.push('/protected/play')
    } else{
      router.push('/protected/play')
    }
    
  };
  
  const renderedItems = shuffleArray([
    <div className={styles.respuesta} onClick={handleWrong} key={1}>{data[current].respuesta2}</div>,
    <div className={styles.respuesta} onClick={handleWrong} key={2}>{data[current].respuesta3}</div>,
    <div className={styles.respuesta} onClick={handleWrong} key={3}>{data[current].respuesta4}</div>,
    <div className={styles.respuesta} onClick={handleCorrect} key={4}>{data[current].respuestaCorrecta}</div>
  ]);

  const renderedItemsCheat = shuffleArray([
    <div className={styles.respuesta} onClick={handleWrong} key={3}>{data[current].respuesta4}</div>,
    <div className={styles.respuesta} onClick={handleCorrect} key={4}>{data[current].respuestaCorrecta}</div>
  ]);

  return (
  <div className={styles.allContainer}>
    <audio autoPlay loop>
        <source src="/inGame.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
    <div className={styles.questionContainer}>

    <header className={styles.header}>
      <h1 className={styles.headerH1}>TriviaQuest</h1>

      <div className={styles.pista}>
        <Image src={"/foco.svg"} width={40} height={40} alt="Foco" className={styles.icon} onClick={handleCheat}></Image>
        <p
        style={cheats == 0 ? {color: "red", fontSize: "1.4em"} : null }
        >{cheats}/3</p>
      </div>
    </header>

    <main className={styles.main}>
      {
        incorrect ?
        <div className={styles.wrongDiv}>
          <audio autoPlay>
            <source src="/incorrect_sound.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <Image src={"/incorrect.svg"} width={40} height={40} alt="Foco" className={styles.wrongIcon}></Image>
          <h1>Tu puntaje fue de: {points}</h1>
          <button type="button" className={styles.play} ><a href="/protected/trivia">Volver a Jugar</a></button>
          <button type="button" className={styles.play} ><a href="/protected/play" onClick={handleSave} >Ir al menú y guardar</a></button>

        </div>
        :
        
          correct ?
            current + 1 == data.length ?

            <div className={styles.wrongDiv}>
              <audio autoPlay>
                <source src="/correct_sound.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <Image src={"/correct.svg"} width={40} height={40} alt="Foco" className={styles.wrongIcon}></Image>
              <h1>¡Lo lograste!</h1>
              <button type="button" className={styles.play} onClick={handleSave} >Ir al menú y guardar</button>
  
            </div>

            :

          <div className={styles.wrongDiv}>
            <audio autoPlay>
              <source src="/correct_sound.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <Image src={"/correct.svg"} width={40} height={40} alt="Foco" className={styles.wrongIcon}></Image>
            <h1>¡Sigue así!</h1>
            <button type="button" className={styles.play} onClick={nextCurrent} >Siguiente pregunta</button>
  
          </div>
          :
          <>
            <div className={styles.pregunta}>
            {data[current].pregunta}
            </div>
      
            <div className={styles.respuestas}>
              {
                
                selectedQuestion ?
                renderedItemsCheat
                :
                renderedItems
              }
            </div>
          </>
        
  
      }

    <p className={styles.puntaje}>Puntaje: {points}</p>

    <p className={styles.contador}>Pregunta: {current + 1} / {data.length}</p>

    </main>

    </div>
  </div>
  );
}
  