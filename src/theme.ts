// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // 🎨 LIGHT MODE COLORS
          background: {
            default: "#FFFFFF",
            paper: "#F9F9F9",
          },
          text: {
            primary: "#454545",
            secondary: "#A9A9A9",
          },
          divider: "#EFEFEF",
        }
      : {
          // 🌙 DARK MODE COLORS
          background: {
            default: "#111111",
            paper: "#2C2C2C",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#A0A0A0",
          },
          divider: "#767676",
        }),
  },
  typography: {
    // --- UPDATED FONT FAMILY ---
    // Make sure 'Figtree' is the first font listed.
    fontFamily: "'Figtree', 'Helvetica', 'Arial', sans-serif",
  },
});

export const createAppTheme = (mode: "light" | "dark") =>
  createTheme(getDesignTokens(mode));
