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
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "./theme/theme";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const savedMode = window.localStorage.getItem("mode");

  const [mode, setMode] = React.useState(savedMode ? savedMode : "light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        window.localStorage.setItem("mode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header colorMode={colorMode} mode={mode} />
        <main style={{ flex: "1 1 auto", backgroundColor: theme.palette.bg.main }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create" element={<CreateArticle />} />
            <Route path="/update/:id" element={<UpdateArticle />} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/article/:id" element={<FullArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
