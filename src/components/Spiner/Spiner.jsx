import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Spiner() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "999",
      }}
    >
      <Stack sx={{ width: "100%", color: "#EE5922" }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>
    </div>
  );
}
