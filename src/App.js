import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegistrationForm from "./pages/Auth/RegistrationForm";
import LoginForm from "./pages/Auth/LoginForm";
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import CommentsPage from "./pages/CommentsPage";
import FullArticle from "./pages/FullArticle";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: "1 1 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/article/:id" element={<FullArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
