import React, { useState } from "react";
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
import { getAllPositions } from "../../../constants/footballPositions";
import Button from "../../ui/Button";
import { theme } from "../../../styles/theme";

// Styled Components
const StyledPaper = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  padding: theme.spacing.xl,
  maxWidth: "800px",
  margin: "0 auto",

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
  className = "",
}) => {
  const [formData, setFormData] = useState({
    firstName: player?.firstName || "",
    lastName: player?.lastName || "",
    dateOfBirth: player?.dateOfBirth ? new Date(player.dateOfBirth) : null,
    countryIds: player?.countries?.map((c) => c.id) || [],
    positionIds: player?.positions?.map((p) => p.id) || [],
    height: player?.height || player?.heightCm || "",
  });

  const [errors, setErrors] = useState({});

  // Use existing data from constants and create countries list
  const allPositions = getAllPositions();
  const allCountries = [
    { id: 1, name: "Brazil", code: "BR" },
    { id: 2, name: "Argentina", code: "AR" },
    { id: 3, name: "Spain", code: "ES" },
    { id: 4, name: "England", code: "EN" },
    { id: 5, name: "France", code: "FR" },
    { id: 6, name: "Germany", code: "DE" },
    { id: 7, name: "Italy", code: "IT" },
    { id: 8, name: "Portugal", code: "PT" },
    { id: 9, name: "Netherlands", code: "NL" },
    { id: 10, name: "Belgium", code: "BE" },
    { id: 11, name: "Croatia", code: "HR" },
    { id: 12, name: "Morocco", code: "MA" },
  ];

  // Add IDs to positions based on their index
  const positionsWithIds = allPositions.map((pos, index) => ({
    ...pos,
    id: index + 1,
  }));

  // Mock data לבינתיים עד שיהיה API
  useEffect(() => {
    // Mock countries data
    const mockCountries = [
      { id: 1, name: "Brazil", code: "BR" },
      { id: 2, name: "Argentina", code: "AR" },
      { id: 3, name: "Spain", code: "ES" },
      { id: 4, name: "England", code: "EN" },
      { id: 5, name: "France", code: "FR" },
      { id: 6, name: "Germany", code: "DE" },
      { id: 7, name: "Italy", code: "IT" },
      { id: 8, name: "Portugal", code: "PT" },
      { id: 9, name: "Netherlands", code: "NL" },
      { id: 10, name: "Belgium", code: "BE" },
    ];

    // Mock positions data
    const mockPositions = [
      { id: 1, code: "GK", name: "Goalkeeper", category: "Goalkeepers" },
      { id: 2, code: "CB", name: "Centre-Back", category: "Defenders" },
      { id: 3, code: "LB", name: "Left-Back", category: "Defenders" },
      { id: 4, code: "RB", name: "Right-Back", category: "Defenders" },
      {
        id: 5,
        code: "CDM",
        name: "Defensive Midfielder",
        category: "Midfielders",
      },
      { id: 6, code: "CM", name: "Centre Midfielder", category: "Midfielders" },
      {
        id: 7,
        code: "CAM",
        name: "Attacking Midfielder",
        category: "Midfielders",
      },
      { id: 8, code: "LW", name: "Left Winger", category: "Forwards" },
      { id: 9, code: "RW", name: "Right Winger", category: "Forwards" },
      { id: 10, code: "ST", name: "Striker", category: "Forwards" },
    ];

    setCountries(mockCountries);
    setPositions(mockPositions);
    setLoadingData(false);
  }, []);

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

    console.log("Validation errors:", newErrors); // Debug
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const isEditing = Boolean(player);

  if (loadingData) {
    return (
      <StyledPaper className={className}>
        <FormHeader>
          <FormTitle>Loading...</FormTitle>
        </FormHeader>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper className={className}>
      <FormHeader>
        <FormTitle>{isEditing ? "Edit Player" : "Add New Player"}</FormTitle>
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
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            required
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
          />
        </FormRow>

        <FormControl error={Boolean(errors.positions)}>
          <InputLabel>Positions *</InputLabel>
          <Select
            multiple
            value={formData.positions}
            onChange={(e) => handleFieldChange("positions", e.target.value)}
            renderValue={(selected) => (
              <ChipsContainer>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </ChipsContainer>
            )}
          >
            {allPositions.map((position) => (
              <MenuItem key={position.code} value={position.code}>
                {position.code} - {position.name}
              </MenuItem>
            ))}
          </Select>
          {errors.positions && <ErrorText>{errors.positions}</ErrorText>}
        </FormControl>

        <TextField
          label="Nationalities (comma separated)"
          value={formData.nationalities.join(", ")}
          onChange={(e) =>
            handleFieldChange(
              "nationalities",
              e.target.value
                .split(",")
                .map((n) => n.trim().toLowerCase())
                .filter((n) => n)
            )
          }
          error={Boolean(errors.nationalities)}
          helperText={
            errors.nationalities || "Enter country codes like: br, ar, us"
          }
          placeholder="br, ar, us"
          required
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
            {isEditing ? "Update Player" : "Create Player"}
          </Button>
        </ActionsContainer>
      </FormGrid>
    </StyledPaper>
  );
};

export default PlayerForm;
