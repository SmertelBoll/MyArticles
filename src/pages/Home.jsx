import { Box } from "@mui/material";
import React from "react";
import Article from "../components/Article/Article";
import ContainerCustom from "../components/ContainerCustom";
import Sorting from "../components/Sorting/Sorting";

function Home() {
  return (
    <Box>
      <ContainerCustom>
        <Sorting />

        {/* articles */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 4 }}>
          <Article />
          <Article />
          <Article />
          <Article />
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Home;
