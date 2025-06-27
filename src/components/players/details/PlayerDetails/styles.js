import { Paper, Avatar, Typography, styled } from "@mui/material";
import { theme } from "../../../../styles/theme";

export const StyledPaper = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  padding: theme.spacing.xl,
  maxWidth: "800px",
  margin: "0 auto",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main}, ${theme.colors.accent.purple})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },
});

export const StyledAvatar = styled(Avatar)({
  background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.accent.purple})`,
  color: "white",
  width: 64,
  height: 64,
  boxShadow: theme.shadows.md,
  border: "3px solid rgba(255, 255, 255, 0.3)",
});

export const PlayerName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.8rem",
  marginBottom: theme.spacing.xs,
});

export const SectionContainer = styled("div")({
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  height: "100%",
});

export const SectionIcon = styled("div")({
  color: theme.colors.primary.main,
  fontSize: "1.5rem",
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  background: `linear-gradient(135deg, ${theme.colors.primary.main}20, ${theme.colors.primary.main}40)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const SectionTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1.1rem",
});

export const InfoLabel = styled(Typography)({
  color: theme.colors.text.secondary,
  fontWeight: 500,
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const InfoValue = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1rem",
});
