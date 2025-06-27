import React from "react";
import Button from "../Button";

export const ConfirmCancelActions = ({
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
);

export const CloseAction = ({ onClose, text = "Close" }) => (
  <Button variant="contained" onClick={onClose}>
    {text}
  </Button>
);
