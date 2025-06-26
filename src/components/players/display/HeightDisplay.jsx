import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

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
    <div className={`height-display ${className}`}>
      <Typography variant="body2" className="height-display__value">
        {convertHeight(height, unit)}
      </Typography>
      {showToggle && (
        <IconButton
          size="small"
          onClick={toggleUnit}
          className="height-display__toggle"
          title={`Switch to ${unit === "cm" ? "feet" : "cm"}`}
        >
          <SwapHorizIcon />
        </IconButton>
      )}
    </div>
  );
};

export default HeightDisplay;
