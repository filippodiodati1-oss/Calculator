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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
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
interface ValueProps {
  currentLeaseValue: number;
  afterExtensionValue: number;
  totalPremium: number;
  remainingLeaseYears: number;
  currentPropertyValue: number;
  sx?: SxProps<Theme>;
}

// -----------------------------
// Component
// -----------------------------
const Value: React.FC<ValueProps> = ({
  currentLeaseValue,
  afterExtensionValue,
  totalPremium,
  currentPropertyValue,
  sx,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const firstBarColor = isLight
    ? "rgba(17,17,17,0.8)"
    : "rgba(255,255,255,0.8)";
  const secondBarColor = "rgba(104,66,255,0.8)";
  const axisTextColor = isLight ? "#111111" : "#FFFFFF";
  const subtitleColor = isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
  const gridStroke = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const data = [
    { name: "Current Property Value", value: currentPropertyValue },
    { name: "After Extension Value", value: afterExtensionValue },
  ];

  const tableData = [
    {
      label: "Current Property Value",
      value: currentPropertyValue,
      color: firstBarColor,
    },
    {
      label: "After Extension Value",
      value: afterExtensionValue,
      color: secondBarColor,
    },
    {
      label: "Total Equity Gain",
      value: afterExtensionValue - currentPropertyValue,
      isTotal: true,
    },
  ];

  return (
    <FrostedGlassBox sx={{ ...sx, width: "100%" }}>
      {/* Titles */}
      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            mb: 1,
            color: axisTextColor,
          }}
        >
          Property value over time
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: subtitleColor,
            maxWidth: 480,
          }}
        >
          An estimated projection of your property's value, now and after the
          lease extension.
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 300, px: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
            barSize={80}
          >
            <CartesianGrid stroke={gridStroke} strokeDasharray="4 2" />
            <XAxis
              dataKey="name"
              tick={{ fill: axisTextColor }}
              tickFormatter={() => ""}
            />
            <YAxis
              tick={{ fill: axisTextColor }}
              tickFormatter={formatAxisNumber}
            />
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              contentStyle={{
                backgroundColor: isLight ? "#fff" : "#111",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: isLight ? "#000" : "#fff", fontWeight: 600 }}
              itemStyle={{ color: isLight ? "#000" : "#fff" }}
              cursor={{
                fill: isLight ? "rgba(17,17,17,0.1)" : "rgba(255,255,255,0.05)",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? firstBarColor : secondBarColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Table */}
      <TableContainer
        sx={{ boxShadow: "none", background: "transparent", mt: 3 }}
      >
        <Table>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.label}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontWeight: row.isTotal ? 600 : 500,
                }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "inherit",
                    color: axisTextColor,
                    borderBottom: row.isTotal
                      ? "none"
                      : `1px solid ${gridStroke}`,
                    paddingY: 0,
                    paddingX: 0,
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
                    borderBottom: row.isTotal
                      ? "none"
                      : `1px solid ${gridStroke}`,
                    paddingY: 0,
                    paddingX: 0,
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

export default Value;
