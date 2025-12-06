import React, { useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import CountUp from "./CountUp";

interface ResultsProps {
  results: {
    forecastValue?: number;
    valueIncrease?: number;
    percentIncrease?: string;
    currentValue?: number;
  };
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

// -----------------------------
// Helpers
// -----------------------------
const formatNumber = (value: number) =>
  Number.isFinite(value) ? new Intl.NumberFormat("en-GB").format(value) : "0";

// -----------------------------
// Component
// -----------------------------
const Results: React.FC<ResultsProps> = ({ results, sx }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const containerRef = useRef<HTMLDivElement>(null);

  const { forecastValue = 0, currentValue = 0 } = results;
  const increase = forecastValue - currentValue;
  const increasePct = currentValue > 0 ? (increase / currentValue) * 100 : 0;

  const baseNumberSize = 42; // original px size
  const numberSize = baseNumberSize * 1.15; // 15% bigger

  return (
    <FrostedGlassBox
      ref={containerRef}
      sx={{ ...sx, display: "flex", flexDirection: "column", gap: 1 }}
    >
      {/* Big number with £ symbol */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography
          sx={{
            fontSize: numberSize * 0.5,
            fontWeight: 700,
            opacity: 0.5,
            color: isLight ? "#111111" : theme.palette.text.primary,
          }}
        >
          £
        </Typography>
        <Typography
          sx={{
            fontSize: numberSize,
            fontWeight: 700,
            color: isLight ? "#111111" : theme.palette.text.primary,
          }}
        >
          <CountUp from={0} to={forecastValue} separator="," duration={0.5} />
        </Typography>
      </Box>

      {/* Title under the big number */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1,
          mt: 0,
          color: isLight ? "#111111" : theme.palette.text.primary,
        }}
      >
        Estimated value after lease extension
      </Typography>

      {/* Subtitle really close to title */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: isLight ? "#454545" : "rgba(255,255,255,0.7)",
          lineHeight: 1,
          mt: "2px",
        }}
      >
        Increase: £{formatNumber(increase)} ({increasePct.toFixed(1)}%)
      </Typography>
    </FrostedGlassBox>
  );
};

export default Results;
