import React, { useEffect } from "react";
import Search from "./Search";
import { Box } from "@mui/material";
import SecondaryButton from "../Buttons/SecondaryButton";

function SortingBlock({ sortItem, setSortItem, sortBy, inputText, onChangeInput }) {
  useEffect(() => {
    onChangeInput("", true);
  }, [sortItem]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0, md: 3 },
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ display: "flex" }}>
        {sortBy.map((obj) => (
          <Box
            key={obj.title}
            sx={{
              px: { xs: 0, sm: 1 },
              borderRight: { xs: "auto", sm: "1px solid #0C1618" },
              "&:last-child": { borderRight: "none" },
            }}
          >
            {obj.title === sortItem.title ? (
              <SecondaryButton onClick={() => setSortItem(obj)} active="true">
                {obj.title}
              </SecondaryButton>
            ) : (
              <SecondaryButton onClick={() => setSortItem(obj)}>{obj.title}</SecondaryButton>
            )}
          </Box>
        ))}
      </Box>
      {sortItem.title === "Search" && (
        <Box sx={{ pt: { xs: 2, md: 0 }, width: "100%" }}>
          <Search inputText={inputText} onChangeInput={onChangeInput} />
        </Box>
      )}
    </Box>
  );
}

export default SortingBlock;
