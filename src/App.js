import React from "react";

import "./App.scss";
import ButtonSemantic from "./components/ButtonSemantic";
import Clip from "./components/Clip";

const App = () => (
  <div className="App">
    <header className="App-header">
      <Clip />
      <ButtonSemantic />
    </header>
  </div>
);

export default App;
