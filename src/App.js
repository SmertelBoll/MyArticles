import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegistrationForm from "./components/Auth/RegistrationForm";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: "1 1 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sing-up" element={<RegistrationForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
