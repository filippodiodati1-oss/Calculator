import React from "react";
import {
  Box,
  Typography,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import CountUp from "./CountUp";

interface ForecastValueProps {
  currentValue: number;
  remainingLeaseYears: number;
  additionalYears: number; // e.g., 90
  sx?: SxProps<Theme>;
}

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
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
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

const ForecastValue: React.FC<ForecastValueProps> = ({
  currentValue,
  remainingLeaseYears,
  additionalYears,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const forecastLease = remainingLeaseYears + additionalYears;

  const baseNumberSize = 42; // original px size
  const numberSize = baseNumberSize * 1.15; // 15% bigger

  return (
    <FrostedGlassBox
      sx={{ ...sx, display: "flex", flexDirection: "column", gap: 1 }}
    >
      {/* Big number with yrs */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography
          sx={{
            fontSize: numberSize,
            fontWeight: 700,
            color: isLight ? "#111111" : theme.palette.text.primary,
          }}
        >
          <CountUp from={0} to={forecastLease} separator="," duration={0.5} />
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

      {/* Title under the number */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1,
          mt: 0,
          color: isLight ? "#111111" : theme.palette.text.primary,
        }}
      >
        Estimated lease after extension
      </Typography>

      {/* Subtitle close to title */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
          lineHeight: 1,
          mt: "2px", // tight spacing
        }}
      >
        +{additionalYears} years added to the lease
      </Typography>
    </FrostedGlassBox>
  );
};

export default ForecastValue;
