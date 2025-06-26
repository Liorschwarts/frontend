import React from "react";
import { Box, Container, styled } from "@mui/material";
import Header from "./Header";
import { theme } from "../../styles/theme";

// Styled Components
const LayoutWrapper = styled(Box)({
  minHeight: "100vh",
  background: theme.colors.background.default,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
});

const MainContent = styled("main")({
  padding: `${theme.spacing.xl} 0`,
  position: "relative",
  zIndex: 1,
  minHeight: "calc(100vh - 64px)",
});

const StyledContainer = styled(Container)(({ noPadding }) => ({
  padding: noPadding ? 0 : `0 ${theme.spacing.lg}`,
  position: "relative",
}));

const ContentWrapper = styled(Box)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  borderRadius: theme.borderRadius.lg,
  border: theme.effects.glassmorphism.border,
  boxShadow: theme.effects.glassmorphism.boxShadow,
  padding: theme.spacing.lg,
  minHeight: "200px",
});

const FloatingShapes = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 0,

  "&::before": {
    content: '""',
    position: "absolute",
    width: "150px",
    height: "150px",
    background: `linear-gradient(135deg, ${theme.colors.accent.purple}20, ${theme.colors.accent.pink}20)`,
    borderRadius: "50%",
    top: "10%",
    right: "5%",
    animation: "float1 8s ease-in-out infinite",
    filter: "blur(40px)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    width: "100px",
    height: "100px",
    background: `linear-gradient(135deg, ${theme.colors.accent.teal}30, ${theme.colors.accent.main}30)`,
    borderRadius: "50%",
    bottom: "20%",
    left: "10%",
    animation: "float2 6s ease-in-out infinite reverse",
    filter: "blur(30px)",
  },

  "@keyframes float1": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "33%": { transform: "translateY(-20px) rotate(120deg)" },
    "66%": { transform: "translateY(10px) rotate(240deg)" },
  },

  "@keyframes float2": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "50%": { transform: "translateY(-30px) rotate(180deg)" },
  },
});

const Layout = ({
  children,
  maxWidth = "xl",
  glassEffect = true,
  noPadding = false,
  className = "",
  style = {},
}) => {
  return (
    <LayoutWrapper className={className}>
      <FloatingShapes />
      <Header />
      <MainContent>
        <StyledContainer
          maxWidth={maxWidth}
          noPadding={noPadding || !glassEffect}
          style={style}
        >
          {glassEffect ? (
            <ContentWrapper>{children}</ContentWrapper>
          ) : (
            <div style={style}>{children}</div>
          )}
        </StyledContainer>
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
