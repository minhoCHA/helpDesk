import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage"; // Component for submitting tickets

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
