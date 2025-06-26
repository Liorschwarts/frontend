import React from "react";
import { Typography, Alert, Box, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { theme } from "../../../styles/theme";

// Styled Components
const ModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  textAlign: "center",
});

const WarningAlert = styled(Alert)({
  background: `linear-gradient(135deg, ${theme.colors.status.warning}20, ${theme.colors.status.error}20)`,
  border: `1px solid ${theme.colors.status.warning}50`,
  borderRadius: theme.borderRadius.md,
});

const PlayerInfoBox = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  padding: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
});

const PlayerName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.25rem",
  marginBottom: theme.spacing.sm,
});

const PlayerDetail = styled(Typography)({
  color: theme.colors.text.secondary,
  fontSize: "0.9rem",
  marginBottom: theme.spacing.xs,
});

const WarningMessage = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 500,
  fontSize: "1rem",
  marginTop: theme.spacing.md,
});

const ActionButtons = styled(Box)({
  display: "flex",
  gap: theme.spacing.md,
  justifyContent: "center",
  marginTop: theme.spacing.lg,
});

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

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete Player"
      maxWidth="sm"
      className={className}
      showCloseButton={false}
    >
      <ModalContent>
        <WarningAlert severity="warning" icon={<WarningIcon />}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            This action cannot be undone!
          </Typography>
        </WarningAlert>

        <WarningMessage>
          Are you sure you want to delete this player?
        </WarningMessage>

        <PlayerInfoBox>
          <PlayerName>
            {player.firstName} {player.lastName}
          </PlayerName>
          <PlayerDetail>
            Positions:{" "}
            {player.positions?.map((p) => p.code || p).join(", ") || "N/A"}
          </PlayerDetail>
          <PlayerDetail>
            Height: {player.heightCm ? `${player.heightCm} cm` : "N/A"}
          </PlayerDetail>
          <PlayerDetail>
            Nationalities:{" "}
            {player.countries?.map((c) => c.name).join(", ") || "N/A"}
          </PlayerDetail>
        </PlayerInfoBox>

        <ActionButtons>
          <Button
            variant="outlined"
            onClick={onCancel}
            startIcon={<CancelIcon />}
            disabled={loading}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            startIcon={<DeleteIcon />}
            disabled={loading}
            size="large"
          >
            {loading ? "Deleting..." : "Delete Player"}
          </Button>
        </ActionButtons>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmModal;
