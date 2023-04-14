import React, { useState } from "react";
import Search from "./Search";
import { Box } from "@mui/material";
import ContainerCustom from "../ContainerCustom";
import SecondaryButton from "../Buttons/SecondaryButton";

const sortBy = ["New", "Popularity", "Search"];

function Sorting() {
  const [sortItem, setSortItem] = useState(sortBy[0]);

  return (
    <Box>
      <ContainerCustom>
        <Box sx={{ display: "flex", gap: { xs: 2, sm: 3 }, alignItems: "center" }}>
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
            <Box sx={{ py: 2 }}>
              <Search />
            </Box>
          )}
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Sorting;
