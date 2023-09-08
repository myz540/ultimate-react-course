import { useQuiz } from "../context/QuizContext";

function ProgressBar() {
  const { activeQuestion, nQuestions, score, maxPossScore } = useQuiz();
  return (
    <div>
      <header className="progress">
        <progress max={nQuestions} value={activeQuestion} />
        <p>
          Question <strong>{activeQuestion + 1}</strong> / {nQuestions}
        </p>
        <p>
          Score <strong>{score}</strong> / {maxPossScore}
        </p>
      </header>
    </div>
  );
}

export default ProgressBar;
