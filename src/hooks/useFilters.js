import { useState, useMemo } from "react";

const useFilters = (players = []) => {
  const [filters, setFilters] = useState({
    name: "",
    nationalities: [],
    ageRange: { min: 18, max: 40 },
    positions: [],
    heightRange: { min: 160, max: 200 },
  });

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  // Apply all filters to players
  const filteredPlayers = useMemo(() => {
    let filtered = [...players];

    // Name filter
    if (filters.name) {
      const searchTerm = filters.name.toLowerCase();
      filtered = filtered.filter((player) => {
        const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
        return fullName.includes(searchTerm);
      });
    }

    // Nationality filter
    if (filters.nationalities?.length > 0) {
      filtered = filtered.filter((player) =>
        player.nationalities?.some((nationality) =>
          filters.nationalities.includes(nationality)
        )
      );
    }

    // Age range filter
    if (
      filters.ageRange?.min !== undefined ||
      filters.ageRange?.max !== undefined
    ) {
      filtered = filtered.filter((player) => {
        const age = calculateAge(player.dateOfBirth);
        const min = filters.ageRange.min ?? 0;
        const max = filters.ageRange.max ?? 100;
        return age >= min && age <= max;
      });
    }

    // Positions filter
    if (filters.positions?.length > 0) {
      filtered = filtered.filter((player) =>
        player.positions?.some((position) =>
          filters.positions.includes(position)
        )
      );
    }

    // Height range filter
    if (
      filters.heightRange?.min !== undefined ||
      filters.heightRange?.max !== undefined
    ) {
      filtered = filtered.filter((player) => {
        if (!player.height) return false;
        const min = filters.heightRange.min ?? 0;
        const max = filters.heightRange.max ?? 300;
        return player.height >= min && player.height <= max;
      });
    }

    return filtered;
  }, [players, filters]);

  // Update a specific filter
  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Update multiple filters at once
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      name: "",
      nationalities: [],
      ageRange: { min: 18, max: 40 },
      positions: [],
      heightRange: { min: 160, max: 200 },
    });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.name ||
      filters.nationalities?.length > 0 ||
      filters.positions?.length > 0 ||
      filters.ageRange?.min !== 18 ||
      filters.ageRange?.max !== 40 ||
      filters.heightRange?.min !== 160 ||
      filters.heightRange?.max !== 200
    );
  }, [filters]);

  // Get filter statistics
  const filterStats = useMemo(() => {
    return {
      totalPlayers: players.length,
      filteredPlayers: filteredPlayers.length,
      hiddenPlayers: players.length - filteredPlayers.length,
    };
  }, [players.length, filteredPlayers.length]);

  return {
    // Current filters state
    filters,
    filteredPlayers,
    hasActiveFilters,
    filterStats,

    // Actions
    updateFilter,
    updateFilters,
    clearFilters,
  };
};

export default useFilters;
