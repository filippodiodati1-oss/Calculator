// src/components/ThemeToggle.tsx
import React from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (mode: "light" | "dark") => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      onClick={toggle}
      sx={{
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
