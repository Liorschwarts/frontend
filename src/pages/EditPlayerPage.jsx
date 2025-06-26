import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Alert, Snackbar, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/layout/Layout";
import PlayerForm from "../components/players/forms/PlayerForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";
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
        message: result.message || "Player updated successfully! ✅",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/players/${id}`);
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Failed to update player ❌",
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
      <Layout glassEffect={false}>
        <LoadingSpinner.Page text="Loading player data..." />
      </Layout>
    );
  }

  if (error || !player) {
    return (
      <Layout glassEffect={false}>
        <ErrorContainer>
          <Alert severity="error" sx={{ maxWidth: "500px" }}>
            {error || "Player not found"}
          </Alert>
        </ErrorContainer>
      </Layout>
    );
  }

  return (
    <PageContainer>
      <Layout glassEffect={false}>
        <PlayerForm
          player={player}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={saving}
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
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Layout>
    </PageContainer>
  );
};

export default EditPlayerPage;
