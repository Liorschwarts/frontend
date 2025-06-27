import React, { useState, useMemo } from "react";
import { Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../../../ui/Button";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useAppContext } from "../../../../contexts/AppContext";
import PlayerFormFields from "./PlayerFormFields";
import { validatePlayerForm } from "./validation";
import {
  StyledPaper,
  FormHeader,
  FormTitle,
  FormGrid,
  ActionsContainer,
} from "./styles";

const PlayerForm = ({
  player = null,
  onSubmit = () => {},
  onCancel = () => {},
  loading = false,
  title = null,
  className = "",
}) => {
  const {
    countries,
    positions,
    loading: appLoading,
    error: appError,
  } = useAppContext();

  // form state ממוטב עם useMemo
  const initialFormData = useMemo(
    () => ({
      firstName: player?.firstName || "",
      lastName: player?.lastName || "",
      dateOfBirth: player?.dateOfBirth ? new Date(player.dateOfBirth) : null,
      positionIds: player?.positions?.map((p) => p.id) || [],
      countryIds: player?.countries?.map((c) => c.id) || [],
      height: player?.height || player?.heightCm || "",
    }),
    [player]
  );

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePlayerForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        heightCm: parseInt(formData.height),
        positions: formData.positionIds.map((id) => ({ id })),
        countries: formData.countryIds.map((id) => ({ id })),
      };
      onSubmit(submitData);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const isEditing = Boolean(player);
  const formTitle = title || (isEditing ? "Edit Player" : "Add New Player");

  if (appLoading) {
    return (
      <StyledPaper className={className}>
        <FormHeader>
          <FormTitle>{formTitle}</FormTitle>
        </FormHeader>
        <LoadingSpinner.Inline text="Loading form data..." />
      </StyledPaper>
    );
  }

  if (appError) {
    return (
      <StyledPaper className={className}>
        <FormHeader>
          <FormTitle>{formTitle}</FormTitle>
        </FormHeader>
        <Typography
          color="error"
          variant="body1"
          sx={{
            textAlign: "center",
            p: 3,
            background: "rgba(244, 67, 54, 0.1)",
            borderRadius: 2,
            border: "1px solid rgba(244, 67, 54, 0.3)",
          }}
        >
          ❌ {appError}
          <br />
          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Typography>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper className={className}>
      <FormHeader>
        <FormTitle>{formTitle}</FormTitle>
      </FormHeader>

      <FormGrid onSubmit={handleSubmit}>
        <PlayerFormFields
          formData={formData}
          errors={errors}
          countries={countries}
          positions={positions}
          onFieldChange={handleFieldChange}
        />

        <ActionsContainer>
          <Button
            variant="outlined"
            onClick={onCancel}
            startIcon={<CancelIcon />}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Player"
              : "Create Player"}
          </Button>
        </ActionsContainer>
      </FormGrid>
    </StyledPaper>
  );
};

export default React.memo(PlayerForm);
