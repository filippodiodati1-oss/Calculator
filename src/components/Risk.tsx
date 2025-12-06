// src/components/Risk.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  SxProps,
  Theme,
  useTheme,
  Fade,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const FrostedGlassBox = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === "light";
  const borderOpacity = isLight ? 0.4 : 0.03;
  const bgColor = isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)";
  return {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: theme.spacing(4, 6),
    backgroundColor: bgColor,
    borderRadius: theme.spacing(5),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "none",
    border: `1.5px solid rgba(255,255,255,${borderOpacity})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      borderRadius: `calc(${theme.spacing(5)} * 0.7)`,
      padding: theme.spacing(2, 3),
    },
  };
});

const PillIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50px",
  padding: theme.spacing(1.5),
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
}));

interface RiskProps {
  sx?: SxProps<Theme>;
  remainingLeaseYears: number;
  forecastValue: number;
  totalPremium: number;
  additionalYears?: number; // usually 90
  currentValue?: number;
  groundRent?: number;
  propertyType?: "House" | "Flat";
  shareUrl: string;
}

const Risk: React.FC<RiskProps> = ({
  sx,
  remainingLeaseYears,
  forecastValue,
  totalPremium,
  additionalYears = 90,
  shareUrl,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [copied, setCopied] = useState(false);

  const forecastLease = remainingLeaseYears + additionalYears;

  const formatNumber = (num: number) =>
    Number.isFinite(num) ? num.toLocaleString("en-GB") : "?";

  const message = `Discover today how much your lease can increase!
Estimated value: £${formatNumber(forecastValue)}
New lease duration: ${forecastLease} yrs
Cost for leasing: £${formatNumber(totalPremium)}
Check it out: ${shareUrl}`;

  const encodedMessage = encodeURIComponent(message);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    email: `mailto:?subject=Lease Extension Result&body=${encodedMessage}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const buttonBg = isLight ? "rgba(17,17,17,0.07)" : "rgba(255,255,255,0.08)";

  return (
    <FrostedGlassBox sx={{ ...sx }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          mb: 1,
          color: isLight ? "#111111" : "#FFFFFF",
        }}
      >
        Share your results
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 16,
          mb: 4,
          color: isLight ? "#111111" : "rgba(255,255,255,0.7)",
          maxWidth: 520,
          textAlign: "center",
        }}
      >
        Scan the QR code or use one of the buttons below to share your lease
        extension results.
      </Typography>

      {/* QR Code */}
      <Box
        sx={{
          mb: 4,
          width: { xs: 120, sm: 138 },
          height: { xs: 120, sm: 138 },
        }}
      >
        <QRCodeCanvas
          value={shareUrl}
          size={138}
          fgColor={isLight ? "#111111" : "#FFFFFF"}
          bgColor="transparent"
        />
      </Box>

      {/* Share Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        {[
          { icon: <WhatsAppIcon />, link: shareLinks.whatsapp },
          { icon: <EmailIcon />, link: shareLinks.email },
          { icon: <FacebookIcon />, link: shareLinks.facebook },
          { icon: <LinkedInIcon />, link: shareLinks.linkedin },
        ].map(({ icon, link }, idx) => (
          <PillIconButton
            key={idx}
            sx={{ backgroundColor: buttonBg }}
            onClick={() => window.open(link, "_blank")}
          >
            {React.cloneElement(icon as any, {
              sx: { color: isLight ? "#111111" : "#fff" },
            })}
          </PillIconButton>
        ))}

        <Box sx={{ position: "relative" }}>
          <PillIconButton
            sx={{ backgroundColor: buttonBg }}
            onClick={copyToClipboard}
          >
            <ContentCopyIcon sx={{ color: isLight ? "#111111" : "#fff" }} />
          </PillIconButton>
          <Fade in={copied}>
            <Box
              sx={{
                position: "absolute",
                top: -30,
                left: "50%",
                transform: "translateX(-50%)",
                px: 2,
                py: 0.5,
                borderRadius: 50,
                bgcolor: "success.main",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Link copied
            </Box>
          </Fade>
        </Box>
      </Box>
    </FrostedGlassBox>
  );
};

export default Risk;
