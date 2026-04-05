import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loader = () => {
  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0",
        }}
      >
        <CircularProgress />
      </Box>
    </div>
  );
};
