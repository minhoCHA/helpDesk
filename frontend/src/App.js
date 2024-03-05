import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage"; 
import TicketForm from "./components/TicketForm"; 
import TicketList from "./components/TicketList"; 

function App() {
  return (
    // Router component to enable SPA (Single Page Application) navigation
    <Router>
      {/* Static Header component that appears across all routes */}
      <Header />
      {/* Routes container to define path-component mappings */}
      <Routes>
        {/* Route for the landing/home page */}
        <Route path="/" element={<LandingPage />}></Route>{" "}
        {/* Route for the ticket submission form */}
        <Route path="/form" element={<TicketForm />}></Route>{" "}
        {/* Route for the admin dashboard to list and manage tickets */}
        <Route path="/admin" element={<TicketList />}></Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
