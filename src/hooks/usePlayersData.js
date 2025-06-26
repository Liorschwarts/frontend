import { useState, useEffect, useCallback } from "react";
import { playersApi } from "../services/playersApi";

const usePlayersData = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all players
  const fetchPlayers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await playersApi.getAllPlayers(params);
      setPlayers(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch players:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single player
  const getPlayer = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const player = await playersApi.getPlayerById(id);
      return player;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new player
  const createPlayer = useCallback(async (playerData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await playersApi.createPlayer(playerData);
      setPlayers((prev) => [...prev, result.data]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing player
  const updatePlayer = useCallback(async (id, playerData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await playersApi.updatePlayer(id, playerData);
      setPlayers((prev) =>
        prev.map((player) => (player.id === id ? result.data : player))
      );
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete player
  const deletePlayer = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await playersApi.deletePlayer(id);
      setPlayers((prev) => prev.filter((player) => player.id !== id));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Bulk upload players
  const bulkUploadPlayers = useCallback(
    async (file, onProgress) => {
      setLoading(true);
      setError(null);

      try {
        const result = await playersApi.bulkUploadPlayers(file, onProgress);
        // Refresh players list after upload
        await fetchPlayers();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchPlayers]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return {
    // State
    players,
    loading,
    error,

    // Actions
    fetchPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    bulkUploadPlayers,
    clearError,
  };
};

export default usePlayersData;
