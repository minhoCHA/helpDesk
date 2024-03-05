import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage"; 
import TicketForm from "./components/TicketForm"; 
import TicketList from "./components/TicketList"; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>{" "}
        <Route path="/form" element={<TicketForm />}></Route>{" "}
        <Route path="/admin" element={<TicketList />}></Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
