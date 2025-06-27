import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormRow, ChipsContainer, ErrorText } from "./styles";

const PlayerFormFields = React.memo(
  ({ formData, errors, countries, positions, onFieldChange }) => {
    return (
      <>
        <FormRow>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => onFieldChange("firstName", e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value)}
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
              onChange={(date) => onFieldChange("dateOfBirth", date)}
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
              onFieldChange("height", parseInt(e.target.value) || "")
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
            onChange={(e) => onFieldChange("positionIds", e.target.value)}
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
            onChange={(e) => onFieldChange("countryIds", e.target.value)}
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
      </>
    );
  }
);

export default PlayerFormFields;
