import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import Layout from "../components/layout/Layout";
import PlayersTable from "../components/players/table/PlayersTable";
import DeleteConfirmModal from "../components/players/forms/DeleteConfirmModal";
import usePlayersData from "../hooks/usePlayersData";

const PlayersListPage = () => {
  const navigate = useNavigate();
  const { players, loading, error, deletePlayer, clearError } =
    usePlayersData();

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    player: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddPlayer = () => {
    navigate("/players/add");
  };

  const handleViewPlayer = (player) => {
    navigate(`/players/${player.id}`);
  };

  const handleEditPlayer = (player) => {
    navigate(`/players/${player.id}/edit`);
  };

  const handleDeleteClick = (player) => {
    setDeleteModal({
      open: true,
      player,
    });
  };

  const handleDeleteConfirm = async (player) => {
    setDeleting(true);
    try {
      await deletePlayer(player.id);
      setDeleteModal({ open: false, player: null });
      setNotification({
        open: true,
        message: `${player.firstName} ${player.lastName} deleted successfully`,
        severity: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        message: err.message || "Failed to delete player",
        severity: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ open: false, player: null });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
    clearError();
  };

  return (
    <div className="players-list-page">
      <Layout onAddPlayer={handleAddPlayer}>
        <PlayersTable
          players={players}
          loading={loading}
          onView={handleViewPlayer}
          onEdit={handleEditPlayer}
          onDelete={handleDeleteClick}
        />

        <DeleteConfirmModal
          open={deleteModal.open}
          player={deleteModal.player}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />

        <Snackbar
          open={notification.open || Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={error ? "error" : notification.severity}
          >
            {error || notification.message}
          </Alert>
        </Snackbar>
      </Layout>
    </div>
  );
};

export default PlayersListPage;
