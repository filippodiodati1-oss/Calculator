import { styled, Box, Theme } from "@mui/material";

// -----------------------------
// Frosted Glass Box
// -----------------------------
export const FrostedGlassBox = styled(Box)(({ theme }: { theme: Theme }) => {
  const isLight = theme.palette.mode === "light";
  const borderOpacity = isLight ? 0.4 : 0.03;

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(4, 6),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    borderRadius: theme.spacing(5),
    boxShadow: "none",
    border: `1.5px solid rgba(255,255,255,${borderOpacity})`,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "inherit",
      zIndex: -1,
    },
    // Responsive adjustments
    [theme.breakpoints.down("md")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`, // 30% smaller
      padding: theme.spacing(2, 3), // 50% smaller
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 3),
    },
  };
});

// -----------------------------
// Format numbers as £ with abbreviations (K / M)
// -----------------------------
export const formatNumber = (num?: number): string => {
  if (!num || !Number.isFinite(num)) return "£0";
  if (num >= 1_000_000)
    return `£${(num / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (num >= 1_000)
    return `£${(num / 1_000).toLocaleString("en-GB", {
      maximumFractionDigits: 1,
    })}K`;
  return `£${num.toLocaleString("en-GB")}`;
};

// -----------------------------
// Format axis numbers without £
// -----------------------------
export const formatAxisNumber = (num: number): string => {
  if (num >= 1_000_000)
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000)
    return `${(num / 1_000).toLocaleString("en-GB", {
      maximumFractionDigits: 1,
    })}K`;
  return `${num}`;
};
