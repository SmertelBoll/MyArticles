import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sorting from "./components/Sorting/Sorting";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: "1 1 auto" }}>
        <Sorting />
      </main>
      <Footer />
    </div>
  );
}

export default App;
