import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={`custom-modal ${className}`}
      {...props}
    >
      {title && (
        <DialogTitle className="modal-title">
          <Typography variant="h6" component="div" className="modal-title-text">
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              className="modal-close-button"
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent className="modal-content">{children}</DialogContent>

      {actions && (
        <DialogActions className="modal-actions">{actions}</DialogActions>
      )}
    </Dialog>
  );
};

// Pre-built action buttons for common use cases
Modal.Actions = {
  ConfirmCancel: ({
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
  }) => (
    <>
      <Button variant="outlined" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button variant="contained" onClick={onConfirm}>
        {confirmText}
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
