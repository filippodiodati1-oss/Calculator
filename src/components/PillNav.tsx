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

  const bgOpacity = Math.min(scrollY / 100, 1);
  const glassColor = isLight
    ? `rgba(17,17,17,${0.05 * bgOpacity})`
    : `rgba(0,0,0,${0.3 * bgOpacity})`;
  const strokeColor = "#FFFFFF";

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{ height: { xs: 30, md: 24 } }}
          />
        </Box>

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
