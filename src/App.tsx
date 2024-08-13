import React from "react";

import logo from "./logo.svg";
import "./App.css";
import TollForm from "./components/TollForm";
import TollList from "./components/TollList";

function App() {
  return (
    <div className="App">
      <TollForm />
      <TollList transactions={} onEdit={} onDelete={} />
    </div>
  );
}

export default App;
