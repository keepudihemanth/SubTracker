import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardLanding from "./components/DashboardLanding";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import About from "./components/About";

export default function App() {
  const [showTracker, setShowTracker] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <Navbar 
        onStartNow={() => { setShowTracker(true); setShowAbout(false); }} 
        goHome={() => { setShowTracker(false); setShowAbout(false); }} 
        goAbout={() => { setShowAbout(true); setShowTracker(false); }} 
      />

      {!showTracker && !showAbout && (
        <>
          <Hero onStartNow={() => setShowTracker(true)} />
          <DashboardLanding onStartNow={() => setShowTracker(true)} />
        </>
      )}

      {showTracker && <Dashboard />}
      {showAbout && <About />}
      
      <Footer />
    </>
  );
}
