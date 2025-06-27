import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import { theme } from "../../styles/theme";

const StyledDialog = styled(Dialog)({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  },

  "& .MuiDialog-paper": {
    background: theme.effects.glassmorphism.background,
    backdropFilter: theme.effects.glassmorphism.backdropFilter,
    border: theme.effects.glassmorphism.border,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows["2xl"],
    overflow: "hidden",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main}, ${theme.colors.accent.purple})`,
      borderRadius: `${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0`,
    },
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  padding: `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.lg}`,
  background: "rgba(255, 255, 255, 0.1)",
  borderBottom: `1px solid ${theme.colors.divider}`,
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingTop: `calc(${theme.spacing.xl} + 4px)`,
});

const TitleText = styled(Typography)({
  flex: 1,
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.25rem",
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: theme.spacing.md,
  top: `calc(${theme.spacing.md} + 4px)`,
  color: theme.colors.text.secondary,
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    color: theme.colors.text.primary,
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: theme.spacing.xl,
  background: "rgba(255, 255, 255, 0.05)",
});

const StyledDialogActions = styled(DialogActions)({
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  gap: theme.spacing.md,
  background: "rgba(255, 255, 255, 0.1)",
  borderTop: `1px solid ${theme.colors.divider}`,
  display: "flex",
  justifyContent: "flex-end",
});

const Modal = ({
  open = false,
  onClose = () => {},
  title = "",
  children,
  actions = null,
  maxWidth = "sm",
  fullWidth = true,
  className = "",
  showCloseButton = true,
  ...props
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {title && (
        <StyledDialogTitle>
          <TitleText variant="h6" component="div">
            {title}
          </TitleText>
          {showCloseButton && (
            <StyledCloseButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </StyledCloseButton>
          )}
        </StyledDialogTitle>
      )}

      <StyledDialogContent>{children}</StyledDialogContent>

      {actions && <StyledDialogActions>{actions}</StyledDialogActions>}
    </StyledDialog>
  );
};

Modal.Actions = {
  ConfirmCancel: ({
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "primary",
    loading = false,
  }) => (
    <>
      <Button variant="outlined" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        variant="contained"
        color={confirmColor}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? "Loading..." : confirmText}
      </Button>
    </>
  ),

  Close: ({ onClose, text = "Close" }) => (
    <Button variant="contained" onClick={onClose}>
      {text}
    </Button>
  ),
};

export default Modal;
