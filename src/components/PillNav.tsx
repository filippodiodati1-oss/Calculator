import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

interface PillNavProps {
  logoLight: string;
  logoDark: string;
  themeMode?: "light" | "dark";
  toggleTheme?: () => void;
  onShare?: () => void;
}

const PillNav: React.FC<PillNavProps> = ({
  logoLight,
  logoDark,
  themeMode = "light",
  toggleTheme,
  onShare,
}) => {
  const isLight = themeMode === "light";
  const textColor = isLight ? "#111111" : "#FFFFFF";
  const logo = isLight ? logoLight : logoDark;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background opacity as you scroll
  const bgOpacity = Math.min(scrollY / 100, 1);

  // Glass background color depending on mode
  const glassColor = isLight
    ? `rgba(17,17,17,${0.05 * bgOpacity})` // very subtle dark overlay for light mode
    : `rgba(0,0,0,${0.3 * bgOpacity})`; // darker overlay for dark mode

  const strokeColor = "#FFFFFF"; // bottom border gradient color

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Background + bottom stroke */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: glassColor,
          backdropFilter: bgOpacity > 0 ? "blur(20px)" : "none",
          transition: "background-color 0.2s, backdrop-filter 0.2s",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: `linear-gradient(to right, ${strokeColor}00, ${strokeColor}33 50%, ${strokeColor}00)`,
          },
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: "auto",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{ height: { xs: 30, md: 24 } }}
          />
        </Box>

        {/* Right Buttons: Theme + Share */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {toggleTheme && (
            <IconButton onClick={toggleTheme} sx={{ color: textColor }}>
              {isLight ? <DarkMode /> : <LightMode />}
            </IconButton>
          )}

          {onShare && (
            <Button
              onClick={onShare}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                color: "#fff",
                backgroundColor: "#6842FFCC",
                borderRadius: "50px",
                px: 2,
                py: 0.75,
                "&:hover": {
                  backgroundColor: "#6842FFDD",
                },
              }}
            >
              Share
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PillNav;
