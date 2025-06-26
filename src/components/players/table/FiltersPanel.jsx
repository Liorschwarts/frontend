import React, { useState } from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Slider,
  Collapse,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getAllPositions,
  getPositionCategories,
} from "../../../constants/footballPositions";
import Button from "../../ui/Button";

const FiltersPanel = ({ onFiltersChange = () => {}, className = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    nationalities: [],
    ageRange: { min: 18, max: 40 },
    positions: [],
    heightRange: { min: 160, max: 200 },
  });

  const allPositions = getAllPositions();
  const positionCategories = getPositionCategories();

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleNameChange = (value) => {
    updateFilters({ ...filters, name: value });
  };

  const handlePositionsChange = (selectedPositions) => {
    updateFilters({ ...filters, positions: selectedPositions });
  };

  const handleAgeRangeChange = (newValue) => {
    updateFilters({
      ...filters,
      ageRange: { min: newValue[0], max: newValue[1] },
    });
  };

  const handleHeightRangeChange = (newValue) => {
    updateFilters({
      ...filters,
      heightRange: { min: newValue[0], max: newValue[1] },
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      name: "",
      nationalities: [],
      ageRange: { min: 18, max: 40 },
      positions: [],
      heightRange: { min: 160, max: 200 },
    };
    updateFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.name ||
      filters.nationalities.length > 0 ||
      filters.positions.length > 0 ||
      filters.ageRange.min !== 18 ||
      filters.ageRange.max !== 40 ||
      filters.heightRange.min !== 160 ||
      filters.heightRange.max !== 200
    );
  };

  return (
    <Paper className={`filters-panel ${className}`}>
      <div className="filters-panel__header">
        <IconButton
          onClick={() => setExpanded(!expanded)}
          className="filters-panel__toggle"
        >
          <FilterListIcon />
        </IconButton>
        <Typography variant="h6" className="filters-panel__title">
          Filters
        </Typography>
        {hasActiveFilters() && (
          <Button
            variant="text"
            size="small"
            onClick={clearAllFilters}
            startIcon={<ClearIcon />}
            className="filters-panel__clear"
          >
            Clear All
          </Button>
        )}
      </div>

      <Collapse in={expanded}>
        <div className="filters-panel__content">
          <div className="filters-panel__row">
            <TextField
              label="Player Name"
              variant="outlined"
              size="small"
              value={filters.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="filters-panel__name"
              placeholder="Search by name..."
            />
          </div>

          <div className="filters-panel__row">
            <FormControl size="small" className="filters-panel__positions">
              <InputLabel>Positions</InputLabel>
              <Select
                multiple
                value={filters.positions}
                onChange={(e) => handlePositionsChange(e.target.value)}
                renderValue={(selected) => (
                  <Box className="filters-panel__chips">
                    {selected.map((positionCode) => (
                      <Chip
                        key={positionCode}
                        label={positionCode}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {positionCategories.map((category) => {
                  const categoryPositions = allPositions.filter(
                    (pos) => pos.category === category
                  );
                  return [
                    <MenuItem
                      key={`category-${category}`}
                      disabled
                      className="filters-panel__category"
                    >
                      <Typography variant="subtitle2">{category}</Typography>
                    </MenuItem>,
                    ...categoryPositions.map((position) => (
                      <MenuItem key={position.code} value={position.code}>
                        {position.code} - {position.name}
                      </MenuItem>
                    )),
                  ];
                })}
              </Select>
            </FormControl>
          </div>

          <div className="filters-panel__row">
            <div className="filters-panel__slider">
              <Typography
                variant="body2"
                className="filters-panel__slider-label"
              >
                Age: {filters.ageRange.min} - {filters.ageRange.max}
              </Typography>
              <Slider
                value={[filters.ageRange.min, filters.ageRange.max]}
                onChange={(e, newValue) => handleAgeRangeChange(newValue)}
                min={16}
                max={45}
                className="filters-panel__age-slider"
              />
            </div>
          </div>

          <div className="filters-panel__row">
            <div className="filters-panel__slider">
              <Typography
                variant="body2"
                className="filters-panel__slider-label"
              >
                Height: {filters.heightRange.min}cm - {filters.heightRange.max}
                cm
              </Typography>
              <Slider
                value={[filters.heightRange.min, filters.heightRange.max]}
                onChange={(e, newValue) => handleHeightRangeChange(newValue)}
                min={150}
                max={210}
                className="filters-panel__height-slider"
              />
            </div>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
};

export default FiltersPanel;
