import "./index.css";
import { useState } from "react";
import DateCounter from "./DateCounter";

const messages = ["Message 1", "Message 2", "Message 3"];

function App() {
  return <DateCounter />;
}

function Steps() {
  const [step, setStep] = useState(0);
  const [dict, setDict] = useState({ name: "MZ" });
  const [hidden, setHidden] = useState(false);

  function handlePrevious() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 2) setStep((s) => s + 1);
    setDict({ ...dict, age: 34 });
  }

  return (
    <>
      <button className="close" onClick={() => setHidden(!hidden)}>
        &times;
      </button>
      {!hidden && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 0 && "active"}>1</div>
            <div className={step >= 1 && "active"}>2</div>
            <div className={step >= 2 && "active"}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step]}, {dict["name"]},{" "}
            {"age" in dict ? dict["age"] : "ageless"}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "purple", color: "white" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "purple", color: "white" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
