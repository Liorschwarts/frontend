import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PlayerDataGrid from "./PlayerDataGrid";
import FiltersPanel from "./FiltersPanel";

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
    let filtered = [...players];

    // Name filter
    if (filters.name) {
      filtered = filtered.filter((player) =>
        `${player.firstName} ${player.lastName}`
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    // Nationality filter
    if (filters.nationalities?.length > 0) {
      filtered = filtered.filter((player) =>
        player.nationalities?.some((nat) => filters.nationalities.includes(nat))
      );
    }

    // Age range filter
    if (filters.ageRange?.min || filters.ageRange?.max) {
      filtered = filtered.filter((player) => {
        const age = calculateAge(player.dateOfBirth);
        const min = filters.ageRange.min || 0;
        const max = filters.ageRange.max || 100;
        return age >= min && age <= max;
      });
    }

    // Positions filter
    if (filters.positions?.length > 0) {
      filtered = filtered.filter((player) =>
        player.positions?.some((pos) => filters.positions.includes(pos))
      );
    }

    // Height range filter
    if (filters.heightRange?.min || filters.heightRange?.max) {
      filtered = filtered.filter((player) => {
        const min = filters.heightRange.min || 0;
        const max = filters.heightRange.max || 300;
        return player.height >= min && player.height <= max;
      });
    }

    setFilteredPlayers(filtered);
  };

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
    <Box className={`players-table ${className}`}>
      <div className="players-table__header">
        <Typography variant="h5" className="players-table__title">
          Players ({filteredPlayers.length})
        </Typography>
      </div>

      <FiltersPanel
        onFiltersChange={handleFiltersChange}
        className="players-table__filters"
      />

      <PlayerDataGrid
        players={filteredPlayers}
        loading={loading}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        className="players-table__grid"
      />
    </Box>
  );
};

export default PlayersTable;
