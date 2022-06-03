import React from "react";
import "./App.css";
import { Sequencer } from "./Sequencer/Sequencer";

function App() {
  return (
    <div className="App">
      <header className="App-header">Drummer</header>
      <main>
        <Sequencer />
      </main>
    </div>
  );
}

export default App;
