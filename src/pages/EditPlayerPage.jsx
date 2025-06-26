import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Alert, Snackbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/layout/Layout";
import PlayerForm from "../components/players/forms/PlayerForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import usePlayersData from "../hooks/usePlayersData";

const EditPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlayer, updatePlayer } = usePlayersData();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    navigate(`/players/${id}`);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);

    try {
      const result = await updatePlayer(id, formData);

      setNotification({
        open: true,
        message: result.message || "Player updated successfully",
        severity: "success",
      });

      // Navigate back after a short delay to show the success message
      setTimeout(() => {
        navigate(`/players/${id}`);
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Failed to update player",
        severity: "error",
      });
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/players/${id}`);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Layout showHeader={false}>
        <LoadingSpinner.Page text="Loading player data..." />
      </Layout>
    );
  }

  if (error || !player) {
    return (
      <Layout showHeader={false}>
        <div className="edit-player-page__error">
          <Alert severity="error">{error || "Player not found"}</Alert>
        </div>
      </Layout>
    );
  }

  return (
    <div className="edit-player-page">
      <Layout showHeader={false}>
        <div className="edit-player-page__header">
          <IconButton
            onClick={handleBack}
            className="edit-player-page__back-icon"
            title="Back to Player Details"
          >
            <ArrowBackIcon />
          </IconButton>
        </div>

        <PlayerForm
          player={player}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={saving}
          className="edit-player-page__form"
        />

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Layout>
    </div>
  );
};

export default EditPlayerPage;
