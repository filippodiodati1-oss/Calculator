import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import AnimatedText from "./AnimatedText";

interface HeroProps {
  themeMode: "light" | "dark";
}

const Hero: React.FC<HeroProps> = ({ themeMode }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        py: { xs: 4, md: 6 }, // reduced padding top & bottom
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "50%" },
            textAlign: "left",
            color:
              themeMode === "light" ? "#111111" : theme.palette.text.primary,
          }}
        >
          {/* Title */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "34.5px", md: "64.4px" },
              fontWeight: 600,
              lineHeight: 1.1,
              mb: 0.25,
              margin: 0, // removes default H1 margin
              color:
                themeMode === "light" ? "#111111" : theme.palette.text.primary,
            }}
          >
            <AnimatedText
              text="See your property’s future clearly"
              animateBy="words"
              delay={75}
              direction="bottom"
            />
          </Typography>

          {/* Subtitle */}
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.35,
              mt: 0.25,
              mb: 0,
              color:
                themeMode === "light" ? "#111111" : theme.palette.text.primary,
            }}
          >
            {/* Add any subtitle text here if needed */}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Hero;
