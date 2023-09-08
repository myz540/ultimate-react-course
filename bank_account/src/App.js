import "./index.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isOpen: false,
};

function reduce(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isOpen: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "requestLoan":
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        loan: state.loan - action.payload,
        balance: state.balance - action.payload,
      };
    case "closeAccount":
      return { ...initialState };
    default:
      throw new Error("Unhandled reducer action.type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const { balance, loan, isOpen } = state;
  return (
    <div className="App">
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <p>
        <button
          disabled={isOpen}
          onClick={() => dispatch({ type: "openAccount" })}
        >
          Open account
        </button>
      </p>

      <p>
        <button
          disabled={!isOpen}
          onClick={() => dispatch({ type: "deposit", payload: 500 })}
        >
          Deposit 500
        </button>
      </p>
      <p>
        <button
          disabled={!isOpen || balance <= 0}
          onClick={() => dispatch({ type: "withdraw", payload: 500 })}
        >
          Withdraw 500
        </button>
      </p>

      <p>
        <button
          disabled={!isOpen || loan > 0}
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
        >
          Request Loan 5000
        </button>
      </p>

      <p>
        <button
          disabled={!isOpen || loan === 0}
          onClick={() => dispatch({ type: "payLoan", payload: 500 })}
        >
          Pay Loan 500
        </button>
      </p>

      <p>
        <button
          disabled={!isOpen}
          onClick={() => dispatch({ type: "closeAccount" })}
        >
          Close Account
        </button>
      </p>
    </div>
  );
}

export default App;
