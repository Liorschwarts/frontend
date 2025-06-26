import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import AddIcon from "@mui/icons-material/Add";
import Button from "../ui/Button";
import { theme } from "../../styles/theme";

// Styled Components
const StyledAppBar = styled(AppBar)({
  background: theme.colors.primary.gradient,
  boxShadow: theme.shadows.lg,
  backdropFilter: theme.effects.backdropBlur,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
    pointerEvents: "none",
  },
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `0 ${theme.spacing.xl}`,
  minHeight: "80px",
  position: "relative",
  zIndex: 1,
});

const BrandContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.lg,
});

const StyledIcon = styled(SportsFootballIcon)({
  fontSize: "2.5rem",
  color: "white",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  animation: "bounce 2s infinite",

  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-10px)",
    },
    "60%": {
      transform: "translateY(-5px)",
    },
  },

  "&:hover": {
    transform: "rotate(360deg)",
    transition: "transform 0.6s ease",
  },
});

const StyledTitle = styled(Typography)({
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  letterSpacing: "0.5px",
});

const ActionsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
});

const StyledAddButton = styled(Button)({
  background: `linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%)`,
  color: "white",
  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
  borderRadius: theme.borderRadius.full,
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  boxShadow: theme.shadows.lg,
  border: "2px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: theme.effects.backdropBlur,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.secondary.main} 100%)`,
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: theme.shadows.xl,
    border: "2px solid rgba(255, 255, 255, 0.4)",
  },

  "&:active": {
    transform: "translateY(0) scale(1.02)",
  },
});

const FloatingOrb = styled("div")({
  position: "absolute",
  width: "100px",
  height: "100px",
  background:
    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)",
  borderRadius: "50%",
  top: "-50px",
  right: "10%",
  animation: "float 6s ease-in-out infinite",

  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-20px)",
    },
  },
});

const Header = ({ onAddPlayer = () => {}, className = "" }) => {
  return (
    <StyledAppBar position="static" className={className}>
      <FloatingOrb />
      <StyledToolbar>
        <BrandContainer>
          <StyledIcon />
          <StyledTitle variant="h6">Football Players Manager</StyledTitle>
        </BrandContainer>

        <ActionsContainer>
          <StyledAddButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddPlayer}
          >
            Add Player
          </StyledAddButton>
        </ActionsContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
