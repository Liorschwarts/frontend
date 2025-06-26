import React from "react";
import { Typography, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const DeleteConfirmModal = ({
  open = false,
  player = null,
  onConfirm = () => {},
  onCancel = () => {},
  loading = false,
  className = "",
}) => {
  if (!player) return null;

  const handleConfirm = () => {
    onConfirm(player);
  };

  const modalActions = (
    <>
      <Button
        variant="outlined"
        onClick={onCancel}
        startIcon={<CancelIcon />}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleConfirm}
        startIcon={<DeleteIcon />}
        disabled={loading}
        className="delete-modal__confirm-button"
      >
        {loading ? "Deleting..." : "Delete Player"}
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete Player"
      actions={modalActions}
      maxWidth="sm"
      className={`delete-confirm-modal ${className}`}
    >
      <div className="delete-modal__content">
        <Alert severity="warning" className="delete-modal__warning">
          This action cannot be undone!
        </Alert>

        <Typography variant="body1" className="delete-modal__message">
          Are you sure you want to delete this player?
        </Typography>

        <div className="delete-modal__player-info">
          <Typography variant="h6" className="delete-modal__player-name">
            {player.firstName} {player.lastName}
          </Typography>
          <Typography variant="body2" className="delete-modal__player-details">
            Positions: {player.positions?.join(", ") || "N/A"}
          </Typography>
          <Typography variant="body2" className="delete-modal__player-details">
            Height: {player.height ? `${player.height} cm` : "N/A"}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
