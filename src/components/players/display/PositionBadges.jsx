import React from "react";
import { Chip, Box, styled } from "@mui/material";
import { theme } from "../../../styles/theme";

const BadgeContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  flexWrap: "wrap",
});

const PositionChip = styled(Chip)(({ category }) => {
  const getPositionStyles = () => {
    const categoryLower = category?.toLowerCase() || "";

    if (categoryLower.includes("defender")) {
      return {
        background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
        color: "white",
        border: `1px solid ${theme.colors.primary.light}`,
      };
    }

    if (categoryLower.includes("midfielder")) {
      return {
        background: `linear-gradient(135deg, ${theme.colors.accent.main}, #059669)`,
        color: "white",
        border: `1px solid ${theme.colors.accent.light}`,
      };
    }

    if (categoryLower.includes("forward")) {
      return {
        background: `linear-gradient(135deg, ${theme.colors.status.error}, #dc2626)`,
        color: "white",
        border: `1px solid #f87171`,
      };
    }

    return {
      background: `linear-gradient(135deg, ${theme.colors.text.disabled}, #9ca3af)`,
      color: "white",
      border: `1px solid #d1d5db`,
    };
  };

  return {
    fontWeight: 600,
    letterSpacing: "0.5px",
    borderRadius: theme.borderRadius.sm,
    fontSize: "0.75rem",
    transition: "all 0.2s ease",
    backdropFilter: "blur(5px)",
    ...getPositionStyles(),

    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: theme.shadows.md,
    },
  };
});

const PositionBadges = ({
  positions = [],
  size = "small",
  variant = "filled",
  className = "",
}) => {
  if (!positions || positions.length === 0) {
    return null;
  }

  return (
    <BadgeContainer className={className}>
      {positions.map((position, index) => {
        const positionCode =
          typeof position === "string" ? position : position.code;
        const positionName =
          typeof position === "string" ? position : position.name;
        const positionCategory =
          typeof position === "string" ? null : position.category;

        return (
          <PositionChip
            key={index}
            label={positionCode}
            size={size}
            variant={variant}
            category={positionCategory}
            title={positionName || positionCode}
          />
        );
      })}
    </BadgeContainer>
  );
};

export default PositionBadges;
