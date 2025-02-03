import { useState, useRef, useEffect } from "react";
import "./App.css";
import Resultados from "./Resultados";

const msg_start = "Adivina el número...";
const maxScore = 20;
let myNumber = Math.trunc(Math.random() * maxScore) + 1;

function App() {
  let highs = localStorage.getItem("highscore") || 0;
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(highs);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(msg_start);
  const [guessNumber, setGuessNumber] = useState("");

  const handleAgain = () => {
    setScore(20);
    setMessage(msg_start);
    myNumber = Math.trunc(Math.random() * maxScore) + 1;
    inputRef.current.value = "";
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handleCheck = () => {
    console.log(inputRef.current.value);
    setGuessNumber(Number(inputRef.current.value));
    console.log(myNumber);
  };

  useEffect(() => {
    if (!Number(guessNumber)) return;
    if (guessNumber < 1 || guessNumber > maxScore) {
      setMessage("El número debe estar entre 1 y " + maxScore);
    } else if (guessNumber !== myNumber) {
      if (score > 1) {
        if (guessNumber > myNumber) {
          //setMessage("📈 ¡Demasiado alto!");
        } else {
          //setMessage("📉 ¡Demasiado bajo!");
        }
      } else {
        //setMessage("💥 ¡Has perdido!");
        inputRef.current.disabled = true;
      }
      setScore(score - 1);
    } else {
      //setMessage("🎉 ¡Lo has adivinado!");
      setHighscore(Math.max(score, highscore));
      localStorage.setItem("highscore", Math.max(score, highscore));
    }
  }, [guessNumber]);

  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and {maxScore})</p>
        <button className="btn again" onClick={handleAgain}>
          Again!
        </button>
        <div className="number">
          {guessNumber === myNumber ? myNumber : "?"}
        </div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" ref={inputRef} />
          <button className="btn check" onClick={handleCheck}>
            Check!
          </button>
        </section>
        <Resultados
          score={score}
          highscore={highscore}
          guessNumber={guessNumber}
          myNumber={myNumber}
        />
      </main>
    </>
  );
}

export default App;
