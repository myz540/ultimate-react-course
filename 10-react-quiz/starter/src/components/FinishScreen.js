import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { score, maxPossScore, dispatch } = useQuiz();
  return (
    <div>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPossScore}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
