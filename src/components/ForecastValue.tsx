import React from "react";
import {
  Box,
  Typography,
  useTheme,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import CountUp from "./CountUp";

// -----------------------------
// Frosted Glass Box
// -----------------------------
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const borderOpacity = isLight ? 0.4 : 0.03;

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(4, 6),
    backgroundColor: isLight ? "rgba(255,255,255,0.95)" : "rgba(28,28,28,0.28)",
    borderRadius: theme.spacing(5),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "none",
    border: `1.5px solid rgba(255,255,255,${borderOpacity})`,
    [theme.breakpoints.down("md")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 3),
    },
  };
});

interface ForecastValueProps {
  currentValue: number;
  remainingLeaseYears: number;
  additionalYears: number; // e.g., 90
  sx?: SxProps<Theme>;
}

const ForecastValue: React.FC<ForecastValueProps> = ({
  currentValue,
  remainingLeaseYears,
  additionalYears,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const newLeaseDuration = remainingLeaseYears + additionalYears;

  const baseNumberSize = 42;
  const numberSize = baseNumberSize * 0.85; // slightly smaller than Results

  return (
    <FrostedGlassBox
      sx={{ ...sx, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          color: isLight ? "#111111" : theme.palette.text.primary,
        }}
      >
        Estimated lease after extension
      </Typography>

      {/* Big animated number */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography
          sx={{
            fontSize: numberSize,
            fontWeight: 700,
            color: isLight ? "#111111" : theme.palette.text.primary,
          }}
        >
          <CountUp
            from={remainingLeaseYears}
            to={newLeaseDuration}
            separator=","
            duration={0.5}
          />
        </Typography>
        <Typography
          sx={{
            fontSize: numberSize * 0.5,
            fontWeight: 700,
            opacity: 0.5,
            color: isLight ? "#111111" : theme.palette.text.primary,
          }}
        >
          yrs
        </Typography>
      </Box>

      {/* Paragraph description */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
          lineHeight: 1.5,
        }}
      >
        Extending your lease today could add{" "}
        <strong>{additionalYears} years</strong>, resulting in a new total lease
        of <strong>{newLeaseDuration} years</strong>.
      </Typography>
    </FrostedGlassBox>
  );
};

export default ForecastValue;
