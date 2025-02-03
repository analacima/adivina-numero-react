import PropTypes from "prop-types";

function Resultados(props) {
  const { score, highscore, guessNumber, myNumber } = props;
  let message = "";
  if (guessNumber === myNumber) {
    message = "🎉 ¡Lo has adivinado!";
  } else if (score == 20) {
    message = "Adivina el número...";
  } else if (score > 1) {
    if (guessNumber > myNumber) {
      message = "📈 ¡Demasiado alto!";
    } else {
      message = "📉 ¡Demasiado bajo!";
    }
  } else {
    message = "💥 ¡Has perdido!";
  }

  return (
    <section className="right">
      <p className="message">{message}</p>
      <p className="label-score">
        💯 Score: <span className="score">{score}</span>
      </p>
      <p className="label-highscore">
        🥇 Highscore: <span className="highscore">{highscore}</span>
      </p>
    </section>
  );
}

export default Resultados;
