import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Alert, Snackbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/layout/Layout";
import PlayerForm from "../components/players/forms/PlayerForm";
import usePlayersData from "../hooks/usePlayersData";

const AddPlayerPage = () => {
  const navigate = useNavigate();
  const { createPlayer } = usePlayersData();

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleBack = () => {
    navigate("/players");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const result = await createPlayer(formData);

      setNotification({
        open: true,
        message: result.message || "Player created successfully",
        severity: "success",
      });

      // Navigate back after a short delay to show the success message
      setTimeout(() => {
        navigate("/players");
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Failed to create player",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/players");
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="add-player-page">
      <Layout showHeader={false}>
        <div className="add-player-page__header">
          <IconButton
            onClick={handleBack}
            className="add-player-page__back-icon"
            title="Back to Players"
          >
            <ArrowBackIcon />
          </IconButton>
        </div>

        <PlayerForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          className="add-player-page__form"
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

export default AddPlayerPage;
