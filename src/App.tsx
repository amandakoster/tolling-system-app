import React from "react";

// TODO: add a logo
// import logo from "./logo.svg";
import "./App.css";
import TollForm from "./components/TollForm";
import TollList from "./components/TollList";

function App() {
  console.log(typeof WebAssembly === "object");

  return (
    <div className="App">
      <TollForm />
      {/* <TollList transactions={} onEdit={} onDelete={} /> */}
    </div>
  );
}

export default App;
