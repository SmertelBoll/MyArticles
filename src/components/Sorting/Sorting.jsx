import React, { useState } from "react";
import Search from "./Search";
import { Box } from "@mui/material";
import SecondaryButton from "../Buttons/SecondaryButton";

const sortBy = ["New", "Popularity", "Search"];

function Sorting() {
  const [sortItem, setSortItem] = useState(sortBy[0]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0, md: 3 },
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ py: 2, display: "flex" }}>
        {sortBy.map((name) => (
          <Box
            key={name}
            sx={{
              px: 1,
              borderRight: "1px solid #0C1618",
              "&:last-child": { borderRight: "none" },
            }}
          >
            {name === sortItem ? (
              <SecondaryButton onClick={() => setSortItem(name)} active>
                {name}
              </SecondaryButton>
            ) : (
              <SecondaryButton onClick={() => setSortItem(name)}>{name}</SecondaryButton>
            )}
          </Box>
        ))}
      </Box>
      {sortItem === "Search" && (
        <Box sx={{ pb: 2, pt: { xs: 0, md: 2 }, width: "100%" }}>
          <Search />
        </Box>
      )}
    </Box>
  );
}

export default Sorting;
