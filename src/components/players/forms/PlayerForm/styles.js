import { Paper, Typography, Box, styled } from "@mui/material";
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
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },
});

export const FormHeader = styled("div")({
  marginBottom: theme.spacing.xl,
  textAlign: "center",
});

export const FormTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.5rem",
});

export const FormGrid = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

export const FormRow = styled("div")({
  display: "flex",
  gap: theme.spacing.md,
  "& > *": { flex: 1 },
});

export const ChipsContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing.xs,
});

export const ErrorText = styled(Typography)({
  color: theme.colors.status.error,
  fontSize: "0.75rem",
  marginTop: theme.spacing.xs,
  marginLeft: theme.spacing.sm,
});

export const ActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing.md,
  marginTop: theme.spacing.xl,
  paddingTop: theme.spacing.lg,
  borderTop: `1px solid ${theme.colors.divider}`,
});
