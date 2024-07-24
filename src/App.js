// src/App.js

import React from "react";
import "./App.css";
// import "./table.css";
// import "./challan.css";
import Table from "./table";
import Challan from "./challan";

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <Table />
      </div>
      <div className="main-content">
        <Challan />
      </div>
    </div>
  );
}

export default App;
