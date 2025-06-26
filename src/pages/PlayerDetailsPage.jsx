import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Typography, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../components/layout/Layout";
import PlayerDetails from "../components/players/details/PlayerDetails";
import DeleteConfirmModal from "../components/players/forms/DeleteConfirmModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import usePlayersData from "../hooks/usePlayersData";

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
      <Layout showHeader={false}>
        <LoadingSpinner.Page text="Loading player details..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showHeader={false}>
        <div className="player-details-page__error">
          <Alert severity="error" className="player-details-page__error-alert">
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            className="player-details-page__back-button"
          >
            Back to Players
          </Button>
        </div>
      </Layout>
    );
  }

  if (!player) {
    return (
      <Layout showHeader={false}>
        <div className="player-details-page__not-found">
          <Typography
            variant="h5"
            className="player-details-page__not-found-title"
          >
            Player not found
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back to Players
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <div className="player-details-page">
      <Layout showHeader={false}>
        <div className="player-details-page__header">
          <IconButton
            onClick={handleBack}
            className="player-details-page__back-icon"
            title="Back to Players"
          >
            <ArrowBackIcon />
          </IconButton>

          <div className="player-details-page__actions">
            <Button
              variant="outlined"
              onClick={handleEdit}
              startIcon={<EditIcon />}
              className="player-details-page__edit-button"
            >
              Edit Player
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon />}
              className="player-details-page__delete-button"
            >
              Delete Player
            </Button>
          </div>
        </div>

        <PlayerDetails player={player} />

        <DeleteConfirmModal
          open={deleteModal}
          player={player}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />
      </Layout>
    </div>
  );
};

export default PlayerDetailsPage;
