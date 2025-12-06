import React, { ReactNode } from "react";
import MuiTooltip from "@mui/material/Tooltip";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <MuiTooltip
      title={<span className="text-base-500">{content}</span>}
      arrow
      placement="top"
    >
      <span>{children}</span>
    </MuiTooltip>
  );
};

export default Tooltip;
