import { Card, CardContent, Avatar, Typography, styled } from "@mui/material";
import { theme } from "../../../../styles/theme";

export const StyledCard = styled(Card)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.md,
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows.lg,
    background: "rgba(255, 255, 255, 0.4)",
  },
});

export const StyledCardContent = styled(CardContent)({
  padding: theme.spacing.lg,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const StyledAvatar = styled(Avatar)({
  background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.accent.purple})`,
  color: "white",
  width: 48,
  height: 48,
  boxShadow: theme.shadows.sm,
  border: "2px solid rgba(255, 255, 255, 0.2)",
  flexShrink: 0,
});

export const PlayerName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1.1rem",
  marginBottom: theme.spacing.xs,
});

export const CreatedDate = styled(Typography)({
  color: theme.colors.text.disabled,
  fontSize: "0.75rem",
  textAlign: "center",
  fontStyle: "italic",
});
