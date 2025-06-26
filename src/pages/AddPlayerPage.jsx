import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Alert, Snackbar, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../components/layout/Layout";
import PlayerForm from "../components/players/forms/PlayerForm";
import usePlayersData from "../hooks/usePlayersData";
import { theme } from "../styles/theme";

// Styled Components
const PageContainer = styled("div")({
  minHeight: "100vh",
});

const PageHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing.xl,
  padding: `${theme.spacing.md} 0`,
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

const FormContainer = styled("div")({
  marginTop: theme.spacing.lg,
});

const StyledSnackbar = styled(Snackbar)({
  "& .MuiAlert-root": {
    borderRadius: theme.borderRadius.md,
    backdropFilter: "blur(10px)",
  },
});

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
        message: result.message || "Player created successfully! 🎉",
        severity: "success",
      });

      // Navigate back after showing success message
      setTimeout(() => {
        navigate("/players");
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Failed to create player ❌",
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
    <PageContainer>
      <Layout glassEffect={false}>
        <PageHeader>
          <BackButton onClick={handleBack} title="Back to Players">
            <ArrowBackIcon />
          </BackButton>
        </PageHeader>

        <FormContainer>
          <PlayerForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </FormContainer>

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

export default AddPlayerPage;
