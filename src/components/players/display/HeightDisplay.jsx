import { useState } from "react";
import { Typography, IconButton, styled } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { theme } from "../../../styles/theme";

const HeightContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
});

const HeightValue = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "0.9rem",
  background: "rgba(255, 255, 255, 0.1)",
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.borderRadius.sm,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(5px)",
  minWidth: "60px",
  textAlign: "center",
});

const ToggleButton = styled(IconButton)({
  padding: theme.spacing.xs,
  background: `${theme.colors.primary.main}20`,
  border: `1px solid ${theme.colors.primary.main}40`,
  borderRadius: theme.borderRadius.sm,
  color: theme.colors.primary.main,
  transition: "all 0.2s ease",

  "&:hover": {
    background: `${theme.colors.primary.main}30`,
    transform: "rotate(180deg)",
  },
});

const HeightDisplay = ({
  height,
  defaultUnit = "cm",
  showToggle = true,
  className = "",
}) => {
  const [unit, setUnit] = useState(defaultUnit);

  if (!height) {
    return null;
  }

  const convertHeight = (heightInCm, targetUnit) => {
    if (targetUnit === "ft") {
      const totalInches = heightInCm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}'${inches}"`;
    }
    return `${heightInCm} cm`;
  };

  const toggleUnit = () => {
    setUnit(unit === "cm" ? "ft" : "cm");
  };

  return (
    <HeightContainer className={className}>
      <HeightValue variant="body2">{convertHeight(height, unit)}</HeightValue>
      {showToggle && (
        <ToggleButton
          size="small"
          onClick={toggleUnit}
          title={`Switch to ${unit === "cm" ? "feet" : "cm"}`}
        >
          <SwapHorizIcon fontSize="small" />
        </ToggleButton>
      )}
    </HeightContainer>
  );
};

export default HeightDisplay;
