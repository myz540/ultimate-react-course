import { useState } from "react";

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const today = new Date();
  today.setDate(today.getDate() + count);

  return (
    <div>
      <button onClick={() => setStep((s) => s - 1)}>-</button>
      <span> Step: {step} </span>
      <button onClick={() => setStep((s) => s + 1)}>+</button>
      <br />
      <button onClick={() => setCount((c) => c - step)}>-</button>
      <span> Count: {count} </span>
      <button onClick={() => setCount((c) => c + step)}>+</button>
      <div>
        {count} days from today is {today.toDateString()}
      </div>
    </div>
  );
}
