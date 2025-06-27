import React from "react";
import { styled } from "@mui/material";
import { theme } from "../../../../styles/theme";

export const PlayerNameCell = React.memo(
  styled("div")({
    fontWeight: 600,
    color: theme.colors.text.primary,
    fontSize: "0.95rem",
  })
);

export const PlayerAgeCell = React.memo(
  styled("span")({
    fontWeight: 600,
    color: "white",
    backgroundColor: theme.colors.primary.main,
    padding: "6px 12px",
    borderRadius: theme.borderRadius.full,
    fontSize: "0.85rem",
    boxShadow: theme.shadows.sm,
  })
);

export const PlayerDateCell = React.memo(
  styled("span")({
    fontSize: "0.85rem",
    color: theme.colors.text.secondary,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: "4px 8px",
    borderRadius: theme.borderRadius.sm,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    fontWeight: 500,
  })
);

export const EmptyStateContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing["3xl"],
  background: theme.effects.glassmorphism.background,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.divider}`,
  color: theme.colors.text.secondary,
  fontSize: "1.1rem",
});
