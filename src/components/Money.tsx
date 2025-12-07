import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// -----------------------------
// Frosted Glass Box
// -----------------------------
export const FrostedGlassBox = styled(Box)(({ theme }) => {
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
interface MoneyProps {
  marriageValue: number;
  groundRentComp: number;
  pvc: number;
  totalPremium: number;
  sx?: SxProps<Theme>;
}

// Format number to match Value.tsx
export const formatNumber = (num: number) => {
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
// Component
// -----------------------------
const Money: React.FC<MoneyProps> = ({
  marriageValue,
  groundRentComp,
  pvc,
  totalPremium,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const axisTextColor = isLight ? "#111111" : "#FFFFFF";
  const subtitleColor = isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
  const dividerColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const colors = isLight
    ? ["rgba(17,17,17,0.8)", "rgba(104,66,255,0.8)", "rgba(104,66,255,0.4)"]
    : ["rgba(255,255,255,0.8)", "rgba(104,66,255,0.8)", "rgba(104,66,255,0.4)"];

  const data = [
    { name: "Marriage Value", value: marriageValue },
    { name: "Property value", value: pvc },
    { name: "Ground rent", value: groundRentComp },
  ];

  const tableData = [
    { label: "Marriage Value", value: marriageValue, color: colors[0] },
    { label: "Property value", value: pvc, color: colors[1] },
    { label: "Ground rent", value: groundRentComp, color: colors[2] },
    { label: "Total Premium", value: totalPremium, color: null },
  ];

  return (
    <FrostedGlassBox sx={{ ...sx, width: "100%" }}>
      {/* Titles */}
      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: 18, mb: 1, color: axisTextColor }}
        >
          Leasehold Cost Breakdown
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 16,
            color: subtitleColor,
            maxWidth: 480,
          }}
        >
          This shows how your total costs are distributed across the main
          categories.
        </Typography>
      </Box>

      {/* Pie Chart */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              cornerRadius={8}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              contentStyle={{
                backgroundColor: isLight ? "#fff" : "#111",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: axisTextColor, fontWeight: 600 }}
              itemStyle={{ color: axisTextColor }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Table */}
      <TableContainer
        sx={{ boxShadow: "none", background: "transparent", mt: 3 }}
      >
        <Table>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={row.label}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontWeight: row.label === "Total Premium" ? 600 : 500,
                }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "inherit",
                    color: axisTextColor,
                    borderBottom:
                      index === tableData.length - 1
                        ? "none"
                        : `1px solid ${dividerColor}`,
                    padding: 0,
                    height: "48px",
                  }}
                >
                  {row.color && (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        backgroundColor: row.color,
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {row.label}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "inherit",
                    color: axisTextColor,
                    borderBottom:
                      index === tableData.length - 1
                        ? "none"
                        : `1px solid ${dividerColor}`,
                    padding: 0,
                    height: "48px",
                  }}
                >
                  {formatNumber(row.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FrostedGlassBox>
  );
};

export default Money;
