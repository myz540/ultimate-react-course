import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { nQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{nQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
