import { Box, Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SortingBlock from "../../components/Sorting/SortingBlock";
import Article from "./Article";
import Comment from "./Comment";

const testComments = [1, 2, 3, 4];

function Home() {
  return (
    <ContainerCustom>
      <SortingBlock />

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* articles */}
        <Box
          sx={{
            flexGrow: "2",
            flexBasis: "66.67%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <Article />
          <Article />
          <Article />
          <Article />
        </Box>

        <Box
          sx={{
            flexGrow: "1",
            flexBasis: "33.33%",
            display: { xs: "none", md: "flex" },
            // display: "flex",
            // flexDirection: "column",
            // gap: 3,
          }}
        >
          {/* comments */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignSelf: "start",
            }}
          >
            <Typography variant="p">Comments</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {testComments.map((name) => (
                <Comment key={name} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </ContainerCustom>
  );
}

export default Home;
