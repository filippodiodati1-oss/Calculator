// src/components/Questions.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Wait from "./Wait";

interface QuestionsProps {
  propertyValue: number;
  remainingLeaseYears: number;
  annualGroundRent: number;
  defermentRatePct: number;
}

const Questions: React.FC<QuestionsProps> = ({
  propertyValue,
  remainingLeaseYears,
  annualGroundRent,
  defermentRatePct,
}) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        What if you wait?
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* WAIT CARD */}
        <Box sx={{ flexBasis: { md: "50%" } }}>
          <Wait
            propertyValue={propertyValue}
            remainingYears={remainingLeaseYears}
            annualGroundRent={annualGroundRent}
            defermentRatePct={defermentRatePct}
            sx={{ width: "100%" }}
          />
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flexBasis: { md: "50%" } }}>
          <Typography variant="body1">
            Extend now to avoid higher costs later.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Questions;
