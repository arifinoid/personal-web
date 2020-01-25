import React, { lazy, Suspense } from "react";

import "./App.scss";
import Clip from "./components/Clip";
import Spinner, { Container } from "./components/Spinner";

const WakatimeDashboard = lazy(() => import("./components/WakatimeDashboard"));

const App = () => (
  <div className="App">
    <header className="App-header">
      <Clip />
    </header>

    <Suspense
      fallback={
        <Container>
          <Spinner />
        </Container>
      }
    >
      <WakatimeDashboard />
    </Suspense>

    <footer>
      <p className="footer">Rohmad Arifin &copy; {new Date().getFullYear()}</p>
    </footer>
  </div>
);

export default App;
