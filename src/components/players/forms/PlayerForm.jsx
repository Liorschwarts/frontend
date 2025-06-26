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
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { getAllPositions } from "../../../constants/footballPositions";
import Button from "../../ui/Button";

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
    nationalities: player?.nationalities || [],
    positions: player?.positions || [],
    height: player?.height || "",
  });

  const [errors, setErrors] = useState({});
  const allPositions = getAllPositions();

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

    if (formData.nationalities.length === 0) {
      newErrors.nationalities = "At least one nationality is required";
    }

    if (formData.positions.length === 0) {
      newErrors.positions = "At least one position is required";
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
      onSubmit(formData);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const isEditing = Boolean(player);

  return (
    <Paper className={`player-form ${className}`}>
      <div className="player-form__header">
        <Typography variant="h5" className="player-form__title">
          {isEditing ? "Edit Player" : "Add New Player"}
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="player-form__form">
        <div className="player-form__row">
          <TextField
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            className="player-form__field"
            required
          />

          <TextField
            label="Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            className="player-form__field"
            required
          />
        </div>

        <div className="player-form__row">
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
                  className="player-form__field"
                  required
                />
              )}
              maxDate={new Date()}
              minDate={new Date("1970-01-01")}
            />
          </LocalizationProvider>

          <TextField
            label="Height (cm)"
            variant="outlined"
            type="number"
            value={formData.height}
            onChange={(e) =>
              handleFieldChange("height", parseInt(e.target.value))
            }
            error={Boolean(errors.height)}
            helperText={errors.height}
            className="player-form__field"
            inputProps={{ min: 150, max: 220 }}
            required
          />
        </div>

        <div className="player-form__row">
          <FormControl
            className="player-form__field"
            error={Boolean(errors.positions)}
          >
            <InputLabel>Positions *</InputLabel>
            <Select
              multiple
              value={formData.positions}
              onChange={(e) => handleFieldChange("positions", e.target.value)}
              renderValue={(selected) => (
                <Box className="player-form__chips">
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {allPositions.map((position) => (
                <MenuItem key={position.code} value={position.code}>
                  {position.code} - {position.name}
                </MenuItem>
              ))}
            </Select>
            {errors.positions && (
              <Typography variant="caption" className="player-form__error">
                {errors.positions}
              </Typography>
            )}
          </FormControl>
        </div>

        <div className="player-form__row">
          <TextField
            label="Nationalities (comma separated)"
            variant="outlined"
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
            className="player-form__field player-form__field--full"
            placeholder="br, ar, us"
            required
          />
        </div>

        <div className="player-form__actions">
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
            loading={loading}
            disabled={loading}
          >
            {isEditing ? "Update Player" : "Create Player"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default PlayerForm;
