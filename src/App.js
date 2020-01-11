import React from "react";

import "./App.scss";
import Clip from "./components/Clip";
import WakatimeDashboard from "./components/WakatimeDashboard";

const App = () => (
  <div className="App">
    <header className="App-header">
      <Clip />
    </header>

    <main>
      <WakatimeDashboard />
    </main>

    <footer>
      <p className="footer">Rohmad Arifin &copy; 2020</p>
    </footer>
  </div>
);

export default App;
