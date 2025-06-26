import { Button as MuiButton } from "@mui/material";

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
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={`custom-button ${className}`}
      type={type}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
