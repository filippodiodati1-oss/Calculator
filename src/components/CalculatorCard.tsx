// src/components/CalculatorCard.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  styled,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// -----------------------------
// TYPES
// -----------------------------
interface CalculatorCardProps {
  remainingLeaseYears: number;
  setRemainingLeaseYears: React.Dispatch<React.SetStateAction<number>>;
  groundRent: number;
  setGroundRent: React.Dispatch<React.SetStateAction<number>>;
  currentValue: number;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
  propertyType: "House" | "Flat";
  setPropertyType: React.Dispatch<React.SetStateAction<"House" | "Flat">>;
}

// -----------------------------
// STYLED COMPONENTS
// -----------------------------
const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const borderOpacity = isLight ? 0.4 : 0.03;

  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    padding: theme.spacing(4, 8),
    boxShadow: "none",
    border: `1.5px solid rgba(255,255,255,${borderOpacity})`,
    borderRadius: theme.spacing(5),
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "inherit",
      zIndex: -1,
    },
    [theme.breakpoints.down("md")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 4),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 4),
    },
  };
});

const StyledTextField = styled(TextField)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const bgColor = isLight ? "rgba(69,69,69,0.08)" : "rgba(255,255,255,0.07)";

  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bgColor,
      borderRadius: theme.spacing(1),
      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: isLight ? "#454545" : "#FFFFFF" },
      "&.Mui-focused fieldset": {
        borderColor: isLight ? "#454545" : "#FFFFFF",
      },
      [theme.breakpoints.down("md")]: {
        borderRadius: `calc(${theme.spacing(1)} * 0.7)`,
      },
      [theme.breakpoints.down("sm")]: {
        borderRadius: `calc(${theme.spacing(1)} * 0.7)`,
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.text.primary,
      textAlign: "left",
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&[type=number]": { "-moz-appearance": "textfield" },
      [theme.breakpoints.down("md")]: { padding: theme.spacing(1) },
      [theme.breakpoints.down("sm")]: { padding: theme.spacing(1) },
    },
    "& .MuiInputAdornment-root": { color: "rgba(255,255,255,0.5)" },
  };
});

// -----------------------------
// TOGGLE SWITCH
// -----------------------------
const ToggleContainer = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const padding = 2; // 2px padding inside
  return {
    position: "relative",
    display: "flex",
    borderRadius: theme.spacing(5),
    backgroundColor: isLight ? "rgba(69,69,69,0.08)" : "rgba(255,255,255,0.07)",
    padding: padding,
    cursor: "pointer",
    userSelect: "none",
    marginBottom: theme.spacing(4),
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: 1.5,
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: 1.5,
    },
  };
});

const Slider = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 2,
  bottom: 2,
  left: 2,
  width: "calc(50% - 4px)", // leaves 2px padding on both sides
  borderRadius: theme.spacing(5),
  backgroundColor: "rgba(255,255,255,1)",
  transition: "transform 0.3s ease",
  zIndex: 0,
  boxSizing: "border-box",
}));

const Option = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  zIndex: 1,
  padding: theme.spacing(1, 0),
}));

// -----------------------------
// HELPERS
// -----------------------------
const formatNumber = (value: number | string) => {
  if (value === "" || value === null) return "";
  return Number(value).toLocaleString("en-GB");
};

const parseNumber = (str: string) => Number(str.replace(/,/g, ""));

// -----------------------------
// INPUT ROW COMPONENT
// -----------------------------
const InputRow: React.FC<{
  label: string;
  value: number;
  setValue: (val: number) => void;
  max: number;
  adornment?: string;
}> = ({ label, value, setValue, max, adornment }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [input, setInput] = useState(formatNumber(value));

  useEffect(() => {
    if (parseNumber(input) !== value) setInput(formatNumber(value));
  }, [value]);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setInput(digits.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = parseNumber(digits);
    if (!isNaN(num)) setValue(Math.min(num, max));
  };

  const handleBlur = () => {
    const num = Math.min(parseNumber(input), max);
    setValue(num);
    setInput(formatNumber(num));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
          {label}
        </Typography>
        <InfoOutlinedIcon
          sx={{
            fontSize: 16,
            color: isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
          }}
        />
      </Box>
      <StyledTextField
        fullWidth
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: adornment ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
          ) : undefined,
        }}
      />
    </Box>
  );
};

// -----------------------------
// CALCULATOR CARD
// -----------------------------
const CalculatorCard: React.FC<CalculatorCardProps> = ({
  remainingLeaseYears,
  setRemainingLeaseYears,
  groundRent,
  setGroundRent,
  currentValue,
  setCurrentValue,
  propertyType,
  setPropertyType,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isHouse = propertyType === "House";

  const maxLeaseYears = 999;
  const maxGroundRent = 10000;
  const maxPropertyValue = 100_000_000;

  return (
    <FrostedGlassBox
      sx={{
        borderRadius: theme.spacing(5),
        p: { xs: 4, md: 8 },
        width: { md: "90%" },
        mx: { md: "auto" },
      }}
    >
      {/* Property Type Toggle */}
      <ToggleContainer>
        <Slider sx={{ transform: `translateX(${isHouse ? "0%" : "100%"})` }} />
        <Option onClick={() => setPropertyType("House")}>
          <Typography
            sx={{
              fontWeight: isHouse ? 600 : 400,
              color: isHouse ? "#000" : isLight ? "#454545" : "#FFF",
              position: "relative",
              zIndex: 1,
            }}
          >
            House
          </Typography>
        </Option>
        <Option onClick={() => setPropertyType("Flat")}>
          <Typography
            sx={{
              fontWeight: !isHouse ? 600 : 400,
              color: !isHouse ? "#000" : isLight ? "#454545" : "#FFF",
              position: "relative",
              zIndex: 1,
            }}
          >
            Flat
          </Typography>
        </Option>
      </ToggleContainer>

      {/* Inputs */}
      <InputRow
        label="Remaining lease years"
        value={remainingLeaseYears}
        setValue={setRemainingLeaseYears}
        max={maxLeaseYears}
      />
      <InputRow
        label="Ground rent per year"
        value={groundRent}
        setValue={setGroundRent}
        max={maxGroundRent}
        adornment="£"
      />
      <InputRow
        label="Current property value"
        value={currentValue}
        setValue={setCurrentValue}
        max={maxPropertyValue}
        adornment="£"
      />

      {/* Disclaimer */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mt: 2 }}>
        <InfoOutlinedIcon
          sx={{
            fontSize: 16,
            color: isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
          }}
        />
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: 1.4,
            color: isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
          }}
        >
          * This calculator is for display purposes only. The deferment rate is
          set at 5% and results are indicative. Inflation adjustment is assumed
          at 2.5% per year.
        </Typography>
      </Box>
    </FrostedGlassBox>
  );
};

export default CalculatorCard;
