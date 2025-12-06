// src/components/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

interface FooterProps {
  themeMode: "light" | "dark";
}

const Footer: React.FC<FooterProps> = ({ themeMode }) => {
  const isLight = themeMode === "light";
  const strokeColor = "#FFFFFF";

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        position: "relative",
        zIndex: 10,
        mt: 8,
      }}
    >
      {/* Top stroke identical to header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: `linear-gradient(to right, ${strokeColor}00, ${strokeColor}33 50%, ${strokeColor}00)`,
        }}
      />

      {/* Inner content */}
      <Box
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: { xs: "flex-start", md: "space-between" },
          gap: { xs: 2, md: 0 },
        }}
      >
        {/* LEFT: Logo */}
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={isLight ? logoLight : logoDark}
            alt="Company Logo"
            style={{
              height: 28, // 40px → 28px (30% smaller)
              display: "block",
            }}
          />
        </Box>

        {/* RIGHT: Text content */}
        <Box
          sx={{
            textAlign: { xs: "left", md: "right" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: isLight ? "#111111" : "#FFFFFF",
              fontWeight: 400,
            }}
          >
            © {new Date().getFullYear()} All rights reserved
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
              fontWeight: 300,
              maxWidth: 550,
              mt: 0.5,
            }}
          >
            This calculation is not intended to replace legal or professional
            advice. It is a demonstrative tool providing only an indicative
            value.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
