import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar, styled } from "@mui/material";
import Layout from "../components/layout/Layout";
import PlayersTable from "../components/players/table/PlayersTable";
import DeleteConfirmModal from "../components/players/forms/DeleteConfirmModal";
import BulkUploadForm from "../components/players/forms/BulkUploadForm";
import Modal from "../components/ui/Modal";
import usePlayersData from "../hooks/usePlayersData";

const PageContainer = styled("div")({
  minHeight: "100vh",
  position: "relative",
});

const PlayersListPage = () => {
  const navigate = useNavigate();
  const {
    players,
    loading,
    error,
    pagination,
    searchPlayers,
    deletePlayer,
    bulkUploadPlayers,
    changePage,
    changePageSize,
    clearFilters,
    clearError,
  } = usePlayersData({ page: 0, size: 10 });

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

  const handleSearch = async (searchCriteria) => {
    try {
      await searchPlayers(searchCriteria);
    } catch (err) {
      setNotification({
        open: true,
        message: "Search failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleClearFilters = async () => {
    try {
      clearFilters();
    } catch (err) {
      setNotification({
        open: true,
        message: "Failed to load players.",
        severity: "error",
      });
    }
  };

  const handlePageChange = (newPage) => {
    changePage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    changePageSize(newPageSize);
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
          pagination={pagination}
          onView={handleViewPlayer}
          onEdit={handleEditPlayer}
          onDelete={handleDeleteClick}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
          onBulkUpload={handleBulkUpload}
        />

        <DeleteConfirmModal
          open={deleteModal.open}
          player={deleteModal.player}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />

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
