import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactTypist from "./components/ReactTypist";
import ButtonSemantic from "./components/ButtonSemantic";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hi, I'm Rohmad</h1>
        <p>
          <span>
            <ReactTypist />
          </span>
        </p>
        <span className="ButtonContainer">
          <ButtonSemantic />
        </span>
      </header>
    </div>
  );
}

export default App;
