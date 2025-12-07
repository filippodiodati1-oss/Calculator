// src/components/ShareModal.tsx
import React from "react";
import { Box, IconButton, Modal, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Risk from "./Risk";

export interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  remainingLeaseYears: number;
  forecastValue: number;
  totalPremium: number;
  currentValue?: number;
  groundRent?: number;
  propertyType?: "House" | "Flat";
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onClose,
  remainingLeaseYears,
  forecastValue,
  totalPremium,
  currentValue,
  groundRent,
  propertyType,
  shareUrl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLight = theme.palette.mode === "light";

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        p: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "100%" : 500,
          maxHeight: isMobile ? "90%" : "80%",
          bgcolor: isLight ? "#ffffff" : "#1c1c1c", // solid background
          borderRadius: isMobile ? "24px 24px 0 0" : 5, // bigger radius
          p: isMobile ? 3 : 4,
          boxShadow: 24,
          overflowY: "auto",
          border: `1.5px solid ${
            isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.03)"
          }`, // same stroke as other components
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: theme.palette.text.primary,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Risk component without background */}
        <Risk
          variant="modal"
          remainingLeaseYears={remainingLeaseYears}
          forecastValue={forecastValue}
          totalPremium={totalPremium}
          currentValue={currentValue}
          groundRent={groundRent}
          propertyType={propertyType}
          shareUrl={shareUrl}
        />
      </Box>
    </Modal>
  );
};

export default ShareModal;
