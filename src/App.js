import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import RegistrationForm from "./pages/Auth/RegistrationForm";
import LoginForm from "./pages/Auth/LoginForm";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: "1 1 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sing-up" element={<RegistrationForm />} />
          <Route path="/log-in" element={<LoginForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
