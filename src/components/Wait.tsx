import React, { useMemo } from "react";
import {
  Box,
  Typography,
  useTheme,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { computePremium } from "../lib/computePremium";
import { getRelativityRate } from "../lib/relativityData";
import { formatNumber, formatAxisNumber } from "./shared";

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

// -----------------------------
// Types
// -----------------------------
interface WaitProps {
  propertyValue: number;
  remainingYears: number;
  annualGroundRent: number;
  defermentRatePct: number;
  sx?: SxProps<Theme>;
}

// -----------------------------
// Component
// -----------------------------
const Wait: React.FC<WaitProps> = ({
  propertyValue,
  remainingYears,
  annualGroundRent,
  defermentRatePct,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  // Next 3 years after the input year
  const forecastYears = 3;

  const data = useMemo(() => {
    const result: { leaseYear: number; totalCost: number }[] = [];
    for (let i = 0; i < forecastYears; i++) {
      const yearsLeft = Math.max(remainingYears - i, 1);
      const relativity = getRelativityRate(yearsLeft);
      const { total } = computePremium({
        propertyValue,
        remainingYears: yearsLeft,
        annualGroundRent,
        defermentRatePct,
        relativityRate: relativity,
      });
      result.push({ leaseYear: yearsLeft, totalCost: total });
    }
    return result;
  }, [
    forecastYears,
    remainingYears,
    propertyValue,
    annualGroundRent,
    defermentRatePct,
  ]);

  const barColor = "rgba(104,66,255,0.8)";
  const axisTextColor = isLight ? "#111111" : "#FFFFFF";
  const gridStroke = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  return (
    <FrostedGlassBox sx={{ ...sx, width: "100%" }}>
      {/* Titles */}
      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: 18, mb: 1, color: axisTextColor }}
        >
          What happens if you wait?
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 16,
            color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
            maxWidth: 480,
          }}
        >
          As your lease shortens, the premium increases — sharply once it falls
          below 80 years.
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 300, px: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
            barSize={80} // wider bars for better visual
          >
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 2" />
            <XAxis
              dataKey="leaseYear"
              type="category"
              tick={{ fill: axisTextColor }}
              reversed={false} // left-to-right diminishing years
            />
            <YAxis
              tick={{ fill: axisTextColor }}
              tickFormatter={formatAxisNumber}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <Box
                      sx={{
                        backgroundColor: isLight ? "#fff" : "#111",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: axisTextColor,
                          fontSize: 14,
                        }}
                      >
                        Remaining year: {d.leaseYear}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          color: axisTextColor,
                          fontSize: 14,
                        }}
                      >
                        Cost: {formatNumber(d.totalCost)}
                      </Typography>
                    </Box>
                  );
                }
                return null;
              }}
              cursor={{
                fill: isLight ? "rgba(17,17,17,0.1)" : "rgba(255,255,255,0.05)",
              }}
            />
            <Bar dataKey="totalCost" fill={barColor} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </FrostedGlassBox>
  );
};

export default Wait;
