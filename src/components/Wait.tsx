import React, { useMemo } from "react";
import { Box, Typography, useTheme, SxProps, Theme } from "@mui/material";
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
import { FrostedGlassBox, formatNumber, formatAxisNumber } from "./shared";

interface WaitProps {
  propertyValue: number;
  remainingYears: number;
  annualGroundRent: number;
  defermentRatePct: number;
  sx?: SxProps<Theme>;
}

const Wait: React.FC<WaitProps> = ({
  propertyValue,
  remainingYears,
  annualGroundRent,
  defermentRatePct,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const forecastYears = 6;

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
    // Remove the last bar
    return result.slice(0, result.length - 1);
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
          below 80 years
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            barSize={40} // slightly narrower bars
          >
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 2" />
            <XAxis dataKey="leaseYear" tick={{ fill: axisTextColor }} />
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

            <Bar
              dataKey="totalCost"
              fill={barColor}
              radius={[8, 8, 0, 0]} // rounded top corners
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </FrostedGlassBox>
  );
};

export default Wait;
