import React from "react";
import { Box, CircularProgress, Typography, Backdrop } from "@mui/material";

const LoadingSpinner = ({
  size = 40,
  color = "primary",
  text = "",
  overlay = false,
  className = "",
  fullScreen = false,
  ...props
}) => {
  const SpinnerContent = () => (
    <Box className={`loading-spinner ${className}`} {...props}>
      <CircularProgress size={size} color={color} />
      {text && (
        <Typography variant="body2" className="loading-spinner-text">
          {text}
        </Typography>
      )}
    </Box>
  );

  // Full screen loading with backdrop
  if (fullScreen) {
    return (
      <Backdrop className="loading-backdrop" open={true}>
        <SpinnerContent />
      </Backdrop>
    );
  }

  // Overlay within container
  if (overlay) {
    return (
      <Box className="loading-overlay">
        <SpinnerContent />
      </Box>
    );
  }

  // Regular inline spinner
  return <SpinnerContent />;
};

// Pre-built loading states
LoadingSpinner.Inline = ({ text = "Loading...", ...props }) => (
  <LoadingSpinner size={20} text={text} {...props} />
);

LoadingSpinner.Page = ({ text = "Loading page...", ...props }) => (
  <Box className="loading-page" {...props}>
    <LoadingSpinner size={60} text={text} />
  </Box>
);

LoadingSpinner.Button = ({ ...props }) => (
  <CircularProgress size={20} color="inherit" {...props} />
);

export default LoadingSpinner;
