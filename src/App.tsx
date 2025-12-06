import React, { useEffect, useState, useMemo, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createAppTheme } from "./theme";

import Hero from "./components/Hero";
import CalculatorCard from "./components/CalculatorCard";
import Results from "./components/Results";
import ForecastValue from "./components/ForecastValue";
import Value from "./components/Value";
import Money from "./components/Money";
import Wait from "./components/Wait";
import Risk from "./components/Risk";
import Aurora from "./components/Aurora";
import FAQ from "./components/FAQ";
import PillNav from "./components/PillNav";
import Footer from "./components/Footer";

import { computePremium } from "./lib/computePremium";
import { getRelativityRate } from "./lib/relativityData";

import logoLight from "./assets/logo-light.svg";
import logoDark from "./assets/logo-dark.svg";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const [remainingLeaseYears, setRemainingLeaseYears] = useState(70);
  const [groundRent, setGroundRent] = useState(500);
  const [currentValue, setCurrentValue] = useState(500_000);
  const [propertyType, setPropertyType] = useState<"House" | "Flat">("Flat");

  const standardDefermentRate = 5;

  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  // Generate share URL with current inputs
  const generateShareUrl = () => {
    const params = new URLSearchParams({
      remainingLeaseYears: remainingLeaseYears.toString(),
      groundRent: groundRent.toString(),
      currentValue: currentValue.toString(),
      propertyType,
    });

    return `${window.location.origin}?${params.toString()}`;
  };

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

  // Theme storage
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Compute premium results
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

  // Compute forecast value and increase
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Aurora Background */}
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

      <PillNav
        logoLight={logoLight}
        logoDark={logoDark}
        themeMode={mode}
        toggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
        onShare={() => console.log("Share clicked")}
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

        {/* Two-column layout */}
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
          {/* Left Column */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: 0.35 },
              minWidth: 280,
              position: { md: "sticky" },
              top: { md: 100 },
              alignSelf: "flex-start",
              zIndex: 2,
            }}
            ref={calculatorRef}
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

          {/* Right Column */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: 0.65 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 2, md: 3 },
            }}
          >
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

            <Risk
              remainingLeaseYears={remainingLeaseYears}
              forecastValue={forecastValue}
              totalPremium={results.total}
              additionalYears={90}
              currentValue={currentValue}
              groundRent={groundRent}
              propertyType={propertyType}
              shareUrl={generateShareUrl()}
            />
          </Box>
        </Box>

        {/* FAQ */}
        <Box ref={faqRef} sx={{ mt: 6, px: { xs: 2, md: 4 } }}>
          <FAQ />
        </Box>

        {/* Footer */}
        <Footer themeMode={mode} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
