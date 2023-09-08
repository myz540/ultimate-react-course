import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  questions: [],
  status: "loading",
  activeQuestion: 0,
  answer: null,
  score: 0,
  secondsRemaining: 300,
};

const QuizContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active", activeQuestion: 0 };
    case "selectAnswer":
      const question = state.questions[state.activeQuestion];
      return {
        ...state,
        status: "active",
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      if (state.activeQuestion + 1 === state.questions.length)
        return { ...state, answer: null, status: "finished" };
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        answer: null,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        answer: null,
        activeQuestion: 0,
        questions: state.questions,
      };
    case "tick":
      if (state.secondsRemaining > 1)
        return { ...state, secondsRemaining: state.secondsRemaining - 1 };
      else return { ...state, status: "finished", answer: null };
    default:
      throw new Error("Unhandled action.type");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, activeQuestion, answer, score, secondsRemaining } =
    state;
  const nQuestions = questions.length;
  //const maxPossScore = questions.reduce((prev, cur) => prev + cur.points, 0);
  const maxPossScore = 100;

  useEffect(function () {
    const data = fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions: questions,
        status: status,
        activeQuestion: activeQuestion,
        answer: answer,
        score: score,
        secondsRemaining: secondsRemaining,
        nQuestions: nQuestions,
        maxPossScore: maxPossScore,
        dispatch: dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used outside the QuizProvider");
  return context;
}

export { useQuiz, QuizProvider };
