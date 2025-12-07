import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import { FrostedGlassBox } from "./shared";

// Import images from src/assets
import homeLight from "../assets/home-light.png";
import homeDark from "../assets/home-dark.png";

interface GetQuoteProps {
  sx?: SxProps<Theme>;
}

const GetQuote: React.FC<GetQuoteProps> = ({ sx }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const imageSrc = isLight ? homeLight : homeDark;

  return (
    <FrostedGlassBox
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        backgroundColor: isLight
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(28, 28, 28, 0.28)",
        backdropFilter: "blur(12px)",
        paddingBottom: 4, // extra spacing below button
        ...sx,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={imageSrc}
        alt="Experts service"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 4,
          display: "block",
        }}
      />

      {/* Title */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          color: isLight ? "#111" : "#fff",
          mb: 0.25, // reduced 50% from previous 0.5
          textAlign: "center",
        }}
      >
        Get a quote with experts
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 16,
          maxWidth: 480,
          color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
          textAlign: "center",
        }}
      >
        Find professionals near you who can provide a precise lease-extension
        cost breakdown.
      </Typography>

      {/* Button */}
      <Button
        sx={{
          textTransform: "none",
          fontWeight: 600,
          fontSize: 15,
          color: "#fff",
          backgroundColor: "#6842FFCC",
          borderRadius: "40px",
          px: 4,
          py: 1.2,
          mt: 2,
          minWidth: 200,
          "&:hover": {
            backgroundColor: "#6842FFDD",
          },
        }}
      >
        Get your expert quote
      </Button>
    </FrostedGlassBox>
  );
};

export default GetQuote;
