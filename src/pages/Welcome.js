import React from "react";

export default function Welcome({ name, setName, setStep }) {
  return (
    <div>
      <h2>İsmin:</h2>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={() => setStep(1)}>goygoy</button>
    </div>
  );
}
