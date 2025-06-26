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
  const [filters, setFilters] = useState({
    name: "",
    positionIds: [],
    ageRange: { min: 18, max: 40 },
    heightRange: { min: 160, max: 200 },
  });

  // Load positions from backend
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const positionsData = await playersApi.getPositions();
        setPositions(positionsData);
      } catch (error) {
        console.error("Failed to load positions:", error);
      }
    };
    loadPositions();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const searchParams = {
        name: filters.name || undefined,
        positionIds:
          filters.positionIds.length > 0 ? filters.positionIds : undefined,
        minAge: filters.ageRange.min !== 18 ? filters.ageRange.min : undefined,
        maxAge: filters.ageRange.max !== 40 ? filters.ageRange.max : undefined,
        minHeight:
          filters.heightRange.min !== 160 ? filters.heightRange.min : undefined,
        maxHeight:
          filters.heightRange.max !== 200 ? filters.heightRange.max : undefined,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, v]) => v !== undefined)
      );

      const players = await playersApi.searchPlayers(cleanParams);
      onPlayersUpdate(players);
      onFiltersChange(filters);
    } catch (error) {
      console.error("Search failed:", error);
      onFiltersChange(filters);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    const cleared = {
      name: "",
      positionIds: [],
      ageRange: { min: 18, max: 40 },
      heightRange: { min: 160, max: 200 },
    };
    setFilters(cleared);
    onFiltersChange(cleared);
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
