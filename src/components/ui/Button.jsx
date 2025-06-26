import React from "react";
import { Button as MuiButton, styled } from "@mui/material";
import { theme } from "../../styles/theme";

// Styled Components
const StyledButton = styled(MuiButton)(({ variant, color, size }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "contained":
        return {
          background:
            color === "primary"
              ? `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`
              : color === "secondary"
              ? `linear-gradient(135deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})`
              : color === "error"
              ? `linear-gradient(135deg, ${theme.colors.status.error}, #c62828)`
              : `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          boxShadow: theme.shadows.md,

          "&:hover": {
            background:
              color === "primary"
                ? `linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main})`
                : color === "secondary"
                ? `linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main})`
                : color === "error"
                ? `linear-gradient(135deg, #f44336, ${theme.colors.status.error})`
                : `linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main})`,
            transform: "translateY(-2px)",
            boxShadow: theme.shadows.lg,
          },
        };

      case "outlined":
        return {
          background: "rgba(255, 255, 255, 0.1)",
          border: `2px solid ${
            color === "primary"
              ? theme.colors.primary.main
              : color === "secondary"
              ? theme.colors.secondary.main
              : color === "error"
              ? theme.colors.status.error
              : theme.colors.primary.main
          }`,
          color:
            color === "primary"
              ? theme.colors.primary.main
              : color === "secondary"
              ? theme.colors.secondary.main
              : color === "error"
              ? theme.colors.status.error
              : theme.colors.primary.main,
          backdropFilter: "blur(10px)",

          "&:hover": {
            background:
              color === "primary"
                ? `${theme.colors.primary.main}20`
                : color === "secondary"
                ? `${theme.colors.secondary.main}20`
                : color === "error"
                ? `${theme.colors.status.error}20`
                : `${theme.colors.primary.main}20`,
            transform: "translateY(-1px)",
          },
        };

      case "text":
        return {
          background: "transparent",
          color:
            color === "primary"
              ? theme.colors.primary.main
              : color === "secondary"
              ? theme.colors.secondary.main
              : color === "error"
              ? theme.colors.status.error
              : theme.colors.text.primary,

          "&:hover": {
            background:
              color === "primary"
                ? `${theme.colors.primary.main}15`
                : color === "secondary"
                ? `${theme.colors.secondary.main}15`
                : color === "error"
                ? `${theme.colors.status.error}15`
                : "rgba(0, 0, 0, 0.04)",
          },
        };

      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: "0.8rem",
          minHeight: "32px",
        };
      case "large":
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: "1.1rem",
          minHeight: "48px",
        };
      default: // medium
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: "0.9rem",
          minHeight: "40px",
        };
    }
  };

  return {
    borderRadius: theme.borderRadius.md,
    fontWeight: 600,
    textTransform: "none",
    letterSpacing: "0.5px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: theme.typography.fontFamily,
    ...getSizeStyles(),
    ...getVariantStyles(),

    "&:active": {
      transform: "translateY(0)",
    },

    "&:disabled": {
      background: theme.colors.text.disabled,
      color: "white",
      opacity: 0.6,
      transform: "none",
      "&:hover": {
        transform: "none",
      },
    },
  };
});

const Button = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  startIcon = null,
  endIcon = null,
  onClick = () => {},
  className = "",
  type = "button",
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={className}
      type={type}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
