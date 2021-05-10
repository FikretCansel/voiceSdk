import "./styles.css";
import React from "react";
import Welcome from "./pages/Welcome";
import AudioRoom from "./pages/AudioRoom";

export default function App() {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState();

  return (
    <div className="app">
      <h1>🫖 çayocağı 🫖</h1>
      {step === 0 ? (
        <Welcome name={name} setName={setName} setStep={setStep} />
      ) : (
        <AudioRoom name={name} />
      )}
    </div>
  );
}
