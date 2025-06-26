import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar, Fab, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Layout from "../components/layout/Layout";
import PlayersTable from "../components/players/table/PlayersTable";
import DeleteConfirmModal from "../components/players/forms/DeleteConfirmModal";
import BulkUploadForm from "../components/players/forms/BulkUploadForm";
import Modal from "../components/ui/Modal";
import usePlayersData from "../hooks/usePlayersData";
import { theme } from "../styles/theme";

// Styled Components
const PageContainer = styled("div")({
  minHeight: "100vh",
  position: "relative",
});

const BulkUploadFab = styled(Fab)({
  position: "fixed",
  bottom: theme.spacing.xl,
  left: theme.spacing.xl, // Changed from right to left
  background: `linear-gradient(135deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})`,
  color: "white",
  zIndex: 1000,

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main})`,
    transform: "scale(1.1)",
  },
});

const PlayersListPage = () => {
  const navigate = useNavigate();
  const {
    players,
    loading,
    error,
    deletePlayer,
    bulkUploadPlayers,
    clearError,
    fetchPlayers,
  } = usePlayersData();

  const [deleteModal, setDeleteModal] = useState({ open: false, player: null });
  const [bulkUploadModal, setBulkUploadModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleBulkUpload = () => {
    setBulkUploadModal(true);
  };

  const handleViewPlayer = (player) => {
    navigate(`/players/${player.id}`);
  };

  const handleEditPlayer = (player) => {
    navigate(`/players/${player.id}/edit`);
  };

  const handleDeleteClick = (player) => {
    setDeleteModal({ open: true, player });
  };

  const handleDeleteConfirm = async (player) => {
    setDeleting(true);
    try {
      await deletePlayer(player.id);
      setDeleteModal({ open: false, player: null });
      setNotification({
        open: true,
        message: `${player.firstName} ${player.lastName} deleted successfully ✅`,
        severity: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        message: err.message || "Failed to delete player ❌",
        severity: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ open: false, player: null });
  };

  const handleBulkUploadSubmit = async (file, onProgress) => {
    try {
      const result = await bulkUploadPlayers(file, onProgress);

      // Refresh the players list
      await fetchPlayers();

      setBulkUploadModal(false);
      setNotification({
        open: true,
        message: `Successfully uploaded ${result.count || 0} players! 🎉`,
        severity: "success",
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleBulkUploadCancel = () => {
    setBulkUploadModal(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
    clearError();
  };

  return (
    <PageContainer>
      <Layout>
        <PlayersTable
          players={players}
          loading={loading}
          onView={handleViewPlayer}
          onEdit={handleEditPlayer}
          onDelete={handleDeleteClick}
        />

        {/* Bulk Upload FAB */}
        <BulkUploadFab onClick={handleBulkUpload} title="Bulk Upload Players">
          <CloudUploadIcon />
        </BulkUploadFab>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          open={deleteModal.open}
          player={deleteModal.player}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />

        {/* Bulk Upload Modal */}
        <Modal
          open={bulkUploadModal}
          onClose={handleBulkUploadCancel}
          title="Bulk Upload Players"
          maxWidth="md"
          showCloseButton={false}
        >
          <BulkUploadForm
            onUpload={handleBulkUploadSubmit}
            onCancel={handleBulkUploadCancel}
          />
        </Modal>

        {/* Notifications */}
        <Snackbar
          open={notification.open || Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={error ? "error" : notification.severity}
            variant="filled"
          >
            {error || notification.message}
          </Alert>
        </Snackbar>
      </Layout>
    </PageContainer>
  );
};

export default PlayersListPage;
