import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Snackbar, styled } from "@mui/material";
import Layout from "../components/layout/Layout";
import PlayerForm from "../components/players/forms/PlayerForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import usePlayersData from "../hooks/usePlayersData";
import { theme } from "../styles/theme";

const PageContainer = styled("div")({
  minHeight: "100vh",
});

const ErrorContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.lg,
  marginTop: theme.spacing["2xl"],
});

const StyledSnackbar = styled(Snackbar)({
  "& .MuiAlert-root": {
    borderRadius: theme.borderRadius.md,
    backdropFilter: "blur(10px)",
  },
});

const PlayerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createPlayer, updatePlayer, getPlayer } = usePlayersData();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isEditMode = !!id;
  const pageTitle = isEditMode ? "Edit Player" : "Add New Player";

  useEffect(() => {
    if (!isEditMode) return;

    const fetchPlayer = async () => {
      try {
        setLoading(true);
        setError(null);
        const playerData = await getPlayer(id);
        setPlayer(playerData);
      } catch (err) {
        setError(err.message || "Failed to load player");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id, isEditMode, getPlayer]);

  const handleSubmit = async (formData) => {
    setSaving(true);

    try {
      let result;
      if (isEditMode) {
        result = await updatePlayer(id, formData);
      } else {
        result = await createPlayer(formData);
      }

      setNotification({
        open: true,
        message:
          result.message ||
          `Player ${isEditMode ? "updated" : "created"} successfully! 🎉`,
        severity: "success",
      });

      setTimeout(() => {
        if (isEditMode) {
          navigate(`/players/${id}`);
        } else {
          navigate("/players");
        }
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message:
          error.message ||
          `Failed to ${isEditMode ? "update" : "create"} player ❌`,
        severity: "error",
      });
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/players/${id}`);
    } else {
      navigate("/players");
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (isEditMode && loading) {
    return (
      <Layout glassEffect={false}>
        <LoadingSpinner.Page text="Loading player data..." />
      </Layout>
    );
  }

  if (isEditMode && (error || !player)) {
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
          player={isEditMode ? player : null}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={saving}
          title={pageTitle}
        />

        <StyledSnackbar
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
        </StyledSnackbar>
      </Layout>
    </PageContainer>
  );
};

export default PlayerFormPage;
