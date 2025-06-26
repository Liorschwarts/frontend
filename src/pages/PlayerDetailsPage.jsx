import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Typography, Alert, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../components/layout/Layout";
import PlayerDetails from "../components/players/details/PlayerDetails";
import DeleteConfirmModal from "../components/players/forms/DeleteConfirmModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import usePlayersData from "../hooks/usePlayersData";
import { theme } from "../styles/theme";

// Styled Components
const PageContainer = styled("div")({
  minHeight: "100vh",
});

const PageHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing.sm, // Much smaller
  padding: `${theme.spacing.xs} 0`, // Much smaller
});

const BackButton = styled(IconButton)({
  background: `${theme.colors.primary.main}20`,
  color: theme.colors.primary.main,
  border: `1px solid ${theme.colors.primary.main}40`,
  transition: "all 0.3s ease",
  margin: 0, // Remove default margin
  padding: theme.spacing.sm, // Control padding explicitly

  "&:hover": {
    background: `${theme.colors.primary.main}30`,
    transform: "translateX(-4px)",
    boxShadow: theme.shadows.md,
  },
});

const ErrorContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.lg,
  marginTop: theme.spacing["2xl"], // Reduced from 3xl
});

const NotFoundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.lg,
  marginTop: theme.spacing["2xl"], // Reduced from 3xl
  textAlign: "center",
});

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlayer, deletePlayer } = usePlayersData();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      setError(null);

      try {
        const playerData = await getPlayer(id);
        setPlayer(playerData);
      } catch (err) {
        setError(err.message || "Failed to load player");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayer();
    }
  }, [id, getPlayer]);

  const handleBack = () => {
    navigate("/players");
  };

  const handleEdit = () => {
    navigate(`/players/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deletePlayer(id);
      navigate("/players");
    } catch (err) {
      setError(err.message || "Failed to delete player");
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };

  if (loading) {
    return (
      <Layout glassEffect={false}>
        <LoadingSpinner.Page text="Loading player details..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout glassEffect={false}>
        <ErrorContainer>
          <Alert severity="error" sx={{ maxWidth: "500px" }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back to Players
          </Button>
        </ErrorContainer>
      </Layout>
    );
  }

  if (!player) {
    return (
      <Layout glassEffect={false}>
        <NotFoundContainer>
          <Typography variant="h5" color="text.secondary">
            Player not found
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back to Players
          </Button>
        </NotFoundContainer>
      </Layout>
    );
  }

  return (
    <PageContainer>
      <Layout glassEffect={false}>
        <PlayerDetails
          player={player}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <DeleteConfirmModal
          open={deleteModal}
          player={player}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />
      </Layout>
    </PageContainer>
  );
};

export default PlayerDetailsPage;
