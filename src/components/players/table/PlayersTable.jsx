import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import PlayerDataGrid from "./PlayerDataGrid";
import FiltersPanel from "./FiltersPanel";
import { theme } from "../../../styles/theme";

// Styled Components
const TableContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

const TableHeader = styled("div")({
  marginBottom: theme.spacing.lg,
});

const TableTitle = styled(Typography)({
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  background: "rgba(255, 255, 255, 0.1)",
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

const GridContainer = styled("div")({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  overflow: "hidden",
  width: "100%",
});

const PlayersTable = ({
  players = [],
  loading = false,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  className = "",
}) => {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const handleFiltersChange = (filters) => {
    // If no filters are active, show all players
    const hasActiveFilters = !!(
      filters.name ||
      (filters.positionIds && filters.positionIds.length > 0) ||
      (filters.countryIds && filters.countryIds.length > 0) ||
      (filters.ageRange &&
        (filters.ageRange.min !== 18 || filters.ageRange.max !== 40)) ||
      (filters.heightRange &&
        (filters.heightRange.min !== 160 || filters.heightRange.max !== 200))
    );

    if (!hasActiveFilters) {
      setFilteredPlayers(players);
      return;
    }

    let filtered = [...players];

    if (filters.name) {
      filtered = filtered.filter((player) =>
        `${player.firstName} ${player.lastName}`
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    if (filters.positionIds?.length > 0) {
      filtered = filtered.filter((player) =>
        player.positions?.some((pos) => filters.positionIds.includes(pos.id))
      );
    }

    if (filters.countryIds?.length > 0) {
      filtered = filtered.filter((player) =>
        player.countries?.some((country) =>
          filters.countryIds.includes(country.id)
        )
      );
    }

    if (filters.ageRange?.min || filters.ageRange?.max) {
      filtered = filtered.filter((player) => {
        const age = calculateAge(player.dateOfBirth);
        const min = filters.ageRange.min || 0;
        const max = filters.ageRange.max || 100;
        return age >= min && age <= max;
      });
    }

    if (filters.heightRange?.min || filters.heightRange?.max) {
      filtered = filtered.filter((player) => {
        const min = filters.heightRange.min || 0;
        const max = filters.heightRange.max || 300;
        return player.heightCm >= min && player.heightCm <= max;
      });
    }

    setFilteredPlayers(filtered);
  };

  const handlePlayersUpdate = (newPlayers) => {
    console.log("Updating players list with:", newPlayers.length, "players");
    console.log("Filtered Players:", newPlayers);
    setFilteredPlayers(newPlayers);
  };

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  return (
    <TableContainer className={className}>
      <TableHeader>
        <TableTitle>Players ({filteredPlayers.length})</TableTitle>
      </TableHeader>

      <FiltersPanel
        onFiltersChange={handleFiltersChange}
        onPlayersUpdate={handlePlayersUpdate}
      />

      <GridContainer>
        <PlayerDataGrid
          players={filteredPlayers}
          loading={loading}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </GridContainer>
    </TableContainer>
  );
};

export default PlayersTable;
