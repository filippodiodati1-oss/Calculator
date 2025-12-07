import React, { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { createAppTheme } from "./theme";

import PillNav from "./components/PillNav";
import ShareModal from "./components/ShareModal";
import Hero from "./components/Hero";
import CalculatorCard from "./components/CalculatorCard";
import Results from "./components/Results";
import ForecastValue from "./components/ForecastValue";
import Value from "./components/Value";
import Money from "./components/Money";
import Wait from "./components/Wait";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Aurora from "./components/Aurora";
import GetQuote from "./components/GetQuote";

import { computePremium } from "./lib/computePremium";
import { getRelativityRate } from "./lib/relativityData";

import logoLight from "./assets/logo-light.svg";
import logoDark from "./assets/logo-dark.svg";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Calculator state
  const [remainingLeaseYears, setRemainingLeaseYears] = useState(70);
  const [groundRent, setGroundRent] = useState(500);
  const [currentValue, setCurrentValue] = useState(500_000);
  const [propertyType, setPropertyType] = useState<"House" | "Flat">("Flat");

  const [isShareOpen, setIsShareOpen] = useState(false);

  const standardDefermentRate = 5;

  // Restore inputs from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rly = params.get("remainingLeaseYears");
    const gr = params.get("groundRent");
    const cv = params.get("currentValue");
    const pt = params.get("propertyType");

    if (rly) setRemainingLeaseYears(parseInt(rly));
    if (gr) setGroundRent(parseInt(gr));
    if (cv) setCurrentValue(parseInt(cv));
    if (pt === "House" || pt === "Flat") setPropertyType(pt);
  }, []);

  // Store theme
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Compute premium
  const results = useMemo(() => {
    const relativity = getRelativityRate(remainingLeaseYears);
    return computePremium({
      propertyValue: currentValue,
      remainingYears: remainingLeaseYears,
      annualGroundRent: groundRent,
      defermentRatePct: standardDefermentRate,
      relativityRate: relativity,
    });
  }, [currentValue, remainingLeaseYears, groundRent]);

  // Forecast value
  const getValueIncreasePercentage = (
    remainingYears: number,
    propertyType: "House" | "Flat"
  ) => {
    const clampedYears = Math.min(Math.max(remainingYears, 1), 120);
    let percent = 0;

    if (clampedYears <= 80) {
      percent = 5 + ((80 - clampedYears) / 79) * 25;
    } else {
      percent = ((120 - clampedYears) / 40) * 5;
    }

    if (propertyType === "House") {
      percent *= 1.05;
    }

    return percent;
  };

  const { forecastValue, valueIncrease, percentIncrease } = useMemo(() => {
    const percent = getValueIncreasePercentage(
      remainingLeaseYears,
      propertyType
    );
    const increase = currentValue * (percent / 100);
    return {
      forecastValue: Math.round(currentValue + increase),
      valueIncrease: Math.round(increase),
      percentIncrease: percent.toFixed(1),
    };
  }, [currentValue, remainingLeaseYears, propertyType]);

  const currentLeaseValue = Math.round(
    currentValue * getRelativityRate(remainingLeaseYears)
  );

  // Generate share URL
  const generateShareUrl = () => {
    const params = new URLSearchParams({
      remainingLeaseYears: remainingLeaseYears.toString(),
      groundRent: groundRent.toString(),
      currentValue: currentValue.toString(),
      propertyType,
    });
    return `https://filippodiodati1-oss.github.io/Calculator/?${params.toString()}`;
  };

  const textColor = mode === "light" ? "#000" : "#fff";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Light mode background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: mode === "light" ? "#f5f5f7" : "transparent",
          zIndex: -2,
        }}
      />

      {/* Aurora effect */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Aurora
          colorStops={["#FF9466", "#B19EEF", "#5227FF"]}
          amplitude={1.2}
          blend={0.5}
          speed={1.0}
          opacity={mode === "light" ? 0.4 : 1}
        />
      </Box>

      {/* Nav */}
      <PillNav
        logoLight={logoLight}
        logoDark={logoDark}
        themeMode={mode}
        toggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
        onShare={() => setIsShareOpen(true)}
      />

      {/* Share Modal */}
      <ShareModal
        open={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        remainingLeaseYears={remainingLeaseYears}
        forecastValue={forecastValue}
        totalPremium={results.total}
        currentValue={currentValue}
        groundRent={groundRent}
        propertyType={propertyType}
        shareUrl={generateShareUrl()}
      />

      {/* Main Layout */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "text.primary",
          px: { xs: 2, md: 4 },
          py: 3,
          position: "relative",
        }}
      >
        <Hero themeMode={mode} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 1440,
            mx: "auto",
            width: "100%",
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* Calculator column */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: 0.35 },
              minWidth: 280,
              position: { md: "sticky" },
              top: { md: 100 },
              alignSelf: "flex-start",
              zIndex: 2,
            }}
          >
            <CalculatorCard
              remainingLeaseYears={remainingLeaseYears}
              setRemainingLeaseYears={setRemainingLeaseYears}
              groundRent={groundRent}
              setGroundRent={setGroundRent}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />
          </Box>

          {/* Results column */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: 0.65 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 2, md: 3 },
            }}
          >
            {/* Mobile-only "Your results" text */}
            {isMobile && (
              <Typography
                variant="h5"
                sx={{
                  pt: 6,
                  pb: 0,
                  fontWeight: 700,
                  textAlign: "left",
                  color: textColor,
                  gridColumn: "1 / -1",
                }}
              >
                Your results
              </Typography>
            )}

            <Results
              results={{
                forecastValue,
                valueIncrease,
                percentIncrease,
                currentValue,
              }}
              sx={{ width: "100%" }}
            />
            <ForecastValue
              currentValue={forecastValue}
              remainingLeaseYears={remainingLeaseYears}
              additionalYears={90}
              sx={{ width: "100%" }}
            />
            <Value
              currentLeaseValue={currentLeaseValue}
              afterExtensionValue={forecastValue}
              totalPremium={results.total}
              remainingLeaseYears={remainingLeaseYears}
              currentPropertyValue={currentValue}
              sx={{ width: "100%" }}
            />
            <Money
              marriageValue={results.marriageValue}
              groundRentComp={results.grc}
              pvc={results.pvc}
              totalPremium={results.total}
              sx={{ width: "100%" }}
            />
            <Wait
              propertyValue={currentValue}
              remainingYears={remainingLeaseYears}
              annualGroundRent={groundRent}
              defermentRatePct={standardDefermentRate}
              sx={{ width: "100%" }}
            />
            <GetQuote sx={{ width: "100%" }} />
          </Box>
        </Box>

        <Box sx={{ mt: 6, px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 6, textAlign: "left", color: textColor }}
          ></Typography>
          <FAQ />
        </Box>

        <Footer themeMode={mode} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
