import React from "react";

import "./App.scss";
import Clip from "./components/Clip";
import Blob from "./components/Blob";

const App = () => (
  <div className="App">
    <header className="App-header">
      <Clip />
      <Blob />
    </header>
  </div>
);

export default App;
