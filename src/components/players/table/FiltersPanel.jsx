import React, { useState } from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Slider,
  Collapse,
  IconButton,
  styled,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppContext } from "../../../contexts/AppContext";
import Button from "../../ui/Button";
import { theme } from "../../../styles/theme";

const FilterContainer = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
});

const FilterHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.md,
});

const SearchRow = styled("div")({
  display: "flex",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.md,
});

const FilterRow = styled("div")({
  display: "flex",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.md,
  flexWrap: "wrap",
});

const SliderBox = styled("div")({
  minWidth: "250px",
  flex: 1,
});

const FiltersPanel = ({
  onSearch = () => {},
  onClear = () => {},
  loading = false,
  className = "",
}) => {
  const { countries, positions } = useAppContext();

  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    positionIds: [],
    countryIds: [],
    ageRange: { min: 18, max: 40 },
    heightRange: { min: 160, max: 200 },
  });

  const handleSearch = () => {
    const searchCriteria = {
      name: filters.name || null,
      positionIds: filters.positionIds.length > 0 ? filters.positionIds : null,
      countryIds: filters.countryIds.length > 0 ? filters.countryIds : null,
      minAge: filters.ageRange.min !== 18 ? filters.ageRange.min : null,
      maxAge: filters.ageRange.max !== 40 ? filters.ageRange.max : null,
      minHeight:
        filters.heightRange.min !== 160 ? filters.heightRange.min : null,
      maxHeight:
        filters.heightRange.max !== 200 ? filters.heightRange.max : null,
    };

    const cleanCriteria = Object.fromEntries(
      Object.entries(searchCriteria).filter(([_, v]) => v !== null && v !== "")
    );

    onSearch(cleanCriteria);
  };

  const clearFilters = () => {
    const cleared = {
      name: "",
      positionIds: [],
      countryIds: [],
      ageRange: { min: 18, max: 40 },
      heightRange: { min: 160, max: 200 },
    };
    setFilters(cleared);
    onClear();
  };

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <FilterContainer className={className}>
      <FilterHeader>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{ background: `${theme.colors.primary.main}20` }}
        >
          <FilterListIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
          Filters
        </Typography>
        <Button
          variant="text"
          color="error"
          onClick={clearFilters}
          startIcon={<ClearIcon />}
          disabled={loading}
        >
          Clear
        </Button>
      </FilterHeader>

      <SearchRow>
        <TextField
          placeholder="Search by name..."
          size="small"
          value={filters.name}
          onChange={(e) => updateFilter("name", e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !loading && handleSearch()}
          sx={{ flex: 1 }}
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </SearchRow>

      <Collapse in={expanded}>
        <FilterRow>
          <FormControl size="small" sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Positions</InputLabel>
            <Select
              multiple
              value={filters.positionIds}
              onChange={(e) => updateFilter("positionIds", e.target.value)}
              disabled={loading}
              renderValue={(selected) => (
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {selected.map((id) => {
                    const position = positions.find((p) => p.id === id);
                    return (
                      <Chip
                        key={id}
                        label={position?.code || id}
                        size="small"
                      />
                    );
                  })}
                </div>
              )}
            >
              {positions.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.code} - {position.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Countries</InputLabel>
            <Select
              multiple
              value={filters.countryIds}
              onChange={(e) => updateFilter("countryIds", e.target.value)}
              disabled={loading}
              renderValue={(selected) => (
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {selected.map((id) => {
                    const country = countries.find((c) => c.id === id);
                    return (
                      <Chip key={id} label={country?.name || id} size="small" />
                    );
                  })}
                </div>
              )}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterRow>

        <FilterRow>
          <SliderBox>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Age: {filters.ageRange.min} - {filters.ageRange.max}
            </Typography>
            <Slider
              value={[filters.ageRange.min, filters.ageRange.max]}
              onChange={(e, val) =>
                updateFilter("ageRange", { min: val[0], max: val[1] })
              }
              min={16}
              max={45}
              disabled={loading}
            />
          </SliderBox>

          <SliderBox>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Height: {filters.heightRange.min}cm - {filters.heightRange.max}cm
            </Typography>
            <Slider
              value={[filters.heightRange.min, filters.heightRange.max]}
              onChange={(e, val) =>
                updateFilter("heightRange", { min: val[0], max: val[1] })
              }
              min={150}
              max={210}
              disabled={loading}
            />
          </SliderBox>
        </FilterRow>
      </Collapse>
    </FilterContainer>
  );
};

export default FiltersPanel;
