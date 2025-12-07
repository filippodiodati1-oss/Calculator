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

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: "default" | "modal" }>(({ theme, variant }) => {
  const isLight = theme.palette.mode === "light";
  if (variant === "modal") {
    // ✅ No background, padding, or border in modal
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    };
  }
  // Default Risk style for main UI
  const borderOpacity = isLight ? 0.4 : 0.03;
  return {
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing(4),
    backgroundColor: isLight ? "rgba(255,255,255,0.42)" : "rgba(28,28,28,0.28)",
    borderRadius: theme.spacing(5),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    border: `1.5px solid rgba(255,255,255,${borderOpacity})`,
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
  additionalYears?: number;
  currentValue?: number;
  groundRent?: number;
  propertyType?: "House" | "Flat";
  shareUrl: string;
  variant?: "default" | "modal"; // ✅ new prop
}

const Risk: React.FC<RiskProps> = ({
  sx,
  remainingLeaseYears,
  forecastValue,
  totalPremium,
  additionalYears = 90,
  currentValue,
  groundRent,
  propertyType,
  shareUrl,
  variant = "default",
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

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const whatsappLink = isMobile
    ? `https://wa.me/?text=${encodedMessage}`
    : `https://api.whatsapp.com/send?text=${encodedMessage}`;

  const shareLinks = {
    whatsapp: whatsappLink,
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
    setTimeout(() => setCopied(false), 1500);
  };

  const buttonBg = isLight ? "rgba(17,17,17,0.07)" : "rgba(255,255,255,0.08)";

  return (
    <Container sx={{ ...sx }} variant={variant}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
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
                bgcolor: "#6842FFCC",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Copied
            </Box>
          </Fade>
        </Box>
      </Box>
    </Container>
  );
};

export default Risk;
