import { Button as MuiButton, styled } from "@mui/material";
import { theme } from "../../styles/theme";

const StyledButton = styled(MuiButton)(({ variant, color, size }) => {
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
      default:
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: "0.9rem",
          minHeight: "40px",
        };
    }
  };

  const getVariantStyles = () => {
    if (variant === "contained") {
      const gradients = {
        primary: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
        secondary: `linear-gradient(135deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})`,
        error: `linear-gradient(135deg, ${theme.colors.status.error}, #c62828)`,
      };

      return {
        background: gradients[color] || gradients.primary,
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        boxShadow: theme.shadows.md,

        "&:hover": {
          background: `linear-gradient(135deg, ${
            theme.colors[color]?.light || theme.colors.primary.light
          }, ${theme.colors[color]?.main || theme.colors.primary.main})`,
          transform: "translateY(-2px)",
          boxShadow: theme.shadows.lg,
        },
      };
    }

    if (variant === "outlined") {
      const borderColor =
        theme.colors[color]?.main || theme.colors.primary.main;
      return {
        background: "rgba(255, 255, 255, 0.1)",
        border: `2px solid ${borderColor}`,
        color: borderColor,
        backdropFilter: "blur(10px)",

        "&:hover": {
          background: `${borderColor}20`,
          transform: "translateY(-1px)",
        },
      };
    }

    return {
      background: "transparent",
      color: theme.colors[color]?.main || theme.colors.text.primary,

      "&:hover": {
        background: `${
          theme.colors[color]?.main || theme.colors.primary.main
        }15`,
      },
    };
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
