import React from "react";
import { Chip, Box } from "@mui/material";

const PositionBadges = ({
  positions = [],
  size = "small",
  variant = "filled",
  className = "",
}) => {
  if (!positions || positions.length === 0) {
    return null;
  }

  const getPositionClass = (category) => {
    if (!category) return "position-badge--default";

    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("forward")) return "position-badge--forwards";
    if (categoryLower.includes("midfielder"))
      return "position-badge--midfielders";
    if (categoryLower.includes("defender")) return "position-badge--defenders";
    return "position-badge--default";
  };

  return (
    <Box className={`position-badges ${className}`}>
      {positions.map((position, index) => {
        // Handle both string positions (from frontend) and position objects (from server)
        const positionCode =
          typeof position === "string" ? position : position.code;
        const positionName =
          typeof position === "string" ? position : position.name;
        const positionCategory =
          typeof position === "string" ? null : position.category;

        return (
          <Chip
            key={index}
            label={positionCode}
            size={size}
            variant={variant}
            className={`position-badge ${getPositionClass(positionCategory)}`}
            title={positionName || positionCode}
          />
        );
      })}
    </Box>
  );
};

export default PositionBadges;
