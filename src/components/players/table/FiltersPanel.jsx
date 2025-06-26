import React, { useState, useEffect } from "react";
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
import { playersApi } from "../../../services/playersApi";
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
  onFiltersChange = () => {},
  onPlayersUpdate = () => {},
  className = "",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    positionIds: [],
    countryIds: [],
    ageRange: { min: 18, max: 40 },
    heightRange: { min: 160, max: 200 },
  });

  // Load positions and countries from backend
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [positionsData, countriesData] = await Promise.all([
          playersApi.getPositions(),
          playersApi.getCountries(),
        ]);
        setPositions(positionsData);
        setCountries(countriesData);
      } catch (error) {
        console.error("Failed to load filter data:", error);
      }
    };
    loadFilterData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const searchCriteria = {
        name: filters.name || null,
        positionIds:
          filters.positionIds.length > 0 ? filters.positionIds : null,
        countryIds: filters.countryIds.length > 0 ? filters.countryIds : null,
        minAge: filters.ageRange.min !== 18 ? filters.ageRange.min : null,
        maxAge: filters.ageRange.max !== 40 ? filters.ageRange.max : null,
        minHeight:
          filters.heightRange.min !== 160 ? filters.heightRange.min : null,
        maxHeight:
          filters.heightRange.max !== 200 ? filters.heightRange.max : null,
      };

      // Remove null values for cleaner request body
      const cleanCriteria = Object.fromEntries(
        Object.entries(searchCriteria).filter(
          ([_, v]) => v !== null && v !== ""
        )
      );

      console.log("Search criteria:", cleanCriteria);

      const players = await playersApi.searchPlayers(cleanCriteria);
      console.log("Search results:", players.length, "players found");
      console.log("Search results data:", players);

      onPlayersUpdate(players);
      // DON'T call onFiltersChange here - it causes the filtering issue
      // onFiltersChange(filters);
    } catch (error) {
      console.error("Search failed:", error);
      // Even on error, don't call onFiltersChange
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    const cleared = {
      name: "",
      positionIds: [],
      countryIds: [],
      ageRange: { min: 18, max: 40 },
      heightRange: { min: 160, max: 200 },
    };
    setFilters(cleared);

    // Reset to all players when clearing filters
    try {
      const allPlayers = await playersApi.getAllPlayers();
      onPlayersUpdate(allPlayers);
    } catch (error) {
      console.error("Failed to load all players:", error);
    }

    // Don't call onFiltersChange here either - let it just show all players
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
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          sx={{ flex: 1 }}
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
            />
          </SliderBox>
        </FilterRow>
      </Collapse>
    </FilterContainer>
  );
};

export default FiltersPanel;
