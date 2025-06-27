import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
  styled,
} from "@mui/material";
import { theme } from "../../styles/theme";

const SpinnerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing.lg,
});

const SpinnerText = styled(Typography)({
  marginTop: theme.spacing.md,
  textAlign: "center",
  color: theme.colors.text.secondary,
  fontSize: "0.9rem",
});

const OverlayContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
  borderRadius: "inherit",
});

const PageContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  borderRadius: theme.borderRadius.lg,
  border: theme.effects.glassmorphism.border,
});

const StyledBackdrop = styled(Backdrop)({
  color: "#fff",
  zIndex: 1500,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(8px)",
});

const LoadingSpinner = ({
  size = 40,
  color = "primary",
  text = "",
  overlay = false,
  fullScreen = false,
  className = "",
  ...props
}) => {
  const SpinnerContent = () => (
    <SpinnerContainer className={className} {...props}>
      <CircularProgress size={size} color={color} />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );

  if (fullScreen) {
    return (
      <StyledBackdrop open={true}>
        <SpinnerContent />
      </StyledBackdrop>
    );
  }

  if (overlay) {
    return (
      <OverlayContainer>
        <SpinnerContent />
      </OverlayContainer>
    );
  }

  return <SpinnerContent />;
};

LoadingSpinner.Inline = ({ text = "Loading...", ...props }) => (
  <LoadingSpinner size={20} text={text} {...props} />
);

LoadingSpinner.Page = ({ text = "Loading page...", ...props }) => (
  <PageContainer {...props}>
    <LoadingSpinner size={60} text={text} />
  </PageContainer>
);

LoadingSpinner.Button = ({ ...props }) => (
  <CircularProgress size={20} color="inherit" {...props} />
);

export default LoadingSpinner;
