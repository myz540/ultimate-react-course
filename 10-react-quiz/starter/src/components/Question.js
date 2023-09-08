import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

function Question() {
  const { questions, activeQuestion, dispatch, answer } = useQuiz();
  const question = questions[activeQuestion];

  return (
    <div className="question">
      <h4>Active Question: {question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
