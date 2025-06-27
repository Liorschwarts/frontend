import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useAppContext } from "../../../contexts/AppContext";
import { theme } from "../../../styles/theme";

const StyledPaper = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  padding: theme.spacing.xl,
  maxWidth: "800px",
  margin: "0 auto",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },
});

const FormHeader = styled("div")({
  marginBottom: theme.spacing.xl,
  textAlign: "center",
});

const FormTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.5rem",
});

const FormGrid = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

const FormRow = styled("div")({
  display: "flex",
  gap: theme.spacing.md,
  "& > *": { flex: 1 },
});

const ChipsContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing.xs,
});

const ErrorText = styled(Typography)({
  color: theme.colors.status.error,
  fontSize: "0.75rem",
  marginTop: theme.spacing.xs,
  marginLeft: theme.spacing.sm,
});

const ActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing.md,
  marginTop: theme.spacing.xl,
  paddingTop: theme.spacing.lg,
  borderTop: `1px solid ${theme.colors.divider}`,
});

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

  const [formData, setFormData] = useState({
    firstName: player?.firstName || "",
    lastName: player?.lastName || "",
    dateOfBirth: player?.dateOfBirth ? new Date(player.dateOfBirth) : null,
    positionIds: player?.positions?.map((p) => p.id) || [],
    countryIds: player?.countries?.map((c) => c.id) || [],
    height: player?.height || player?.heightCm || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
      if (age < 16 || age > 50) {
        newErrors.dateOfBirth = "Age must be between 16 and 50";
      }
    }

    if (formData.countryIds.length === 0) {
      newErrors.countryIds = "At least one nationality is required";
    }

    if (formData.positionIds.length === 0) {
      newErrors.positionIds = "At least one position is required";
    }

    if (!formData.height || formData.height < 150 || formData.height > 220) {
      newErrors.height = "Height must be between 150-220 cm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        <FormRow>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            required
            fullWidth
          />
        </FormRow>

        <FormRow>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => handleFieldChange("dateOfBirth", date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth}
                  required
                  fullWidth
                />
              )}
              maxDate={new Date()}
              minDate={new Date("1970-01-01")}
            />
          </LocalizationProvider>
          <TextField
            label="Height (cm)"
            type="number"
            value={formData.height}
            onChange={(e) =>
              handleFieldChange("height", parseInt(e.target.value) || "")
            }
            error={Boolean(errors.height)}
            helperText={errors.height}
            inputProps={{ min: 150, max: 220 }}
            required
            fullWidth
          />
        </FormRow>

        <FormControl error={Boolean(errors.positionIds)} fullWidth>
          <InputLabel>Positions *</InputLabel>
          <Select
            multiple
            value={formData.positionIds}
            onChange={(e) => handleFieldChange("positionIds", e.target.value)}
            renderValue={(selected) => (
              <ChipsContainer>
                {selected.map((id) => {
                  const position = positions.find((p) => p.id === id);
                  return (
                    <Chip key={id} label={position?.code || id} size="small" />
                  );
                })}
              </ChipsContainer>
            )}
          >
            {positions.map((position) => (
              <MenuItem key={position.id} value={position.id}>
                {position.code} - {position.name}
              </MenuItem>
            ))}
          </Select>
          {errors.positionIds && <ErrorText>{errors.positionIds}</ErrorText>}
        </FormControl>

        <FormControl error={Boolean(errors.countryIds)} fullWidth>
          <InputLabel>Nationalities *</InputLabel>
          <Select
            multiple
            value={formData.countryIds}
            onChange={(e) => handleFieldChange("countryIds", e.target.value)}
            renderValue={(selected) => (
              <ChipsContainer>
                {selected.map((id) => {
                  const country = countries.find((c) => c.id === id);
                  return (
                    <Chip key={id} label={country?.name || id} size="small" />
                  );
                })}
              </ChipsContainer>
            )}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
          {errors.countryIds && <ErrorText>{errors.countryIds}</ErrorText>}
        </FormControl>

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

export default PlayerForm;
