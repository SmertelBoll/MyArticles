import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
// import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
// import { theme } from "./theme/theme";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ThemeProvider theme={theme}>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </ThemeProvider>
);
