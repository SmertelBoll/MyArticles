import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/HomePage";
import RegistrationForm from "./pages/Auth/RegistrationForm";
import LoginForm from "./pages/Auth/LoginForm";
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import CommentsPage from "./pages/Comments/CommentsPage";
import FullArticle from "./pages/FullArticle";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/AuthSlice";
import UpdateArticle from "./pages/UpdateArticle";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: "1 1 auto" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/update/:id" element={<UpdateArticle />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/article/:id" element={<FullArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
