import React from "react";
import { Box, Typography, useTheme, styled } from "@mui/material";

interface SegmentedToggleProps {
  value: "House" | "Flat";
  onChange: (val: "House" | "Flat") => void;
}

// -----------------------------
// Styled Components
// -----------------------------
const ToggleContainer = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  return {
    position: "relative",
    display: "flex",
    borderRadius: theme.spacing(1),
    backgroundColor: isLight
      ? "rgba(69,69,69,0.08)" // light mode container
      : "rgba(255,255,255,0.07)", // dark mode container
    padding: 2,
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
  };
});

const Slider = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 2,
    bottom: 2,
    width: "50%",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,1)", // selected pill white
    zIndex: 1, // make sure it sits above the container
    transition: "transform 0.3s ease",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.05)", // subtle border
  };
});

const Option = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  zIndex: 2, // text sits above Slider
  padding: "8px 0",
}));

// -----------------------------
// Component
// -----------------------------
const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  value,
  onChange,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isHouse = value === "House";

  const getTextColor = (selected: boolean) => {
    if (selected) return "#000"; // text on white pill
    return isLight ? "#454545" : "#FFFFFF"; // unselected text
  };

  return (
    <ToggleContainer>
      <Slider sx={{ transform: `translateX(${isHouse ? "0%" : "100%"})` }} />
      <Option onClick={() => onChange("House")}>
        <Typography
          sx={{
            fontWeight: isHouse ? 600 : 400,
            color: getTextColor(isHouse),
            zIndex: 2,
            position: "relative",
          }}
        >
          House
        </Typography>
      </Option>
      <Option onClick={() => onChange("Flat")}>
        <Typography
          sx={{
            fontWeight: !isHouse ? 600 : 400,
            color: getTextColor(!isHouse),
            zIndex: 2,
            position: "relative",
          }}
        >
          Flat
        </Typography>
      </Option>
    </ToggleContainer>
  );
};

export default SegmentedToggle;
