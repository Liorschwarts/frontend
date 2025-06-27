import { useCallback } from "react";
import { playersApi } from "../../services/playersApi";

// פונקציות עזר לפעולות CRUD - מופרדות לקובץ נפרד
export const usePlayerOperations = ({
  setLoading,
  setError,
  setPlayers,
  setPaginationData,
  pagination,
  fetchPlayers,
}) => {
  const searchPlayers = useCallback(
    async (searchCriteria) => {
      setLoading(true);
      setError(null);

      try {
        const response = await playersApi.searchPlayers(searchCriteria);

        setPlayers(response.content || []);
        setPaginationData({
          totalElements:
            response.totalElements || response.content?.length || 0,
          totalPages: 1,
          first: true,
          last: true,
          numberOfElements: response.content?.length || 0,
        });

        pagination.reset();
      } catch (err) {
        setError(err.message);
        console.error("Failed to search players:", err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setPlayers, setPaginationData, pagination]
  );

  const getPlayer = useCallback(
    async (id) => {
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
    },
    [setLoading, setError]
  );

  const createPlayer = useCallback(
    async (playerData) => {
      setLoading(true);
      setError(null);

      try {
        const result = await playersApi.createPlayer(playerData);
        await fetchPlayers();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fetchPlayers]
  );

  const updatePlayer = useCallback(
    async (id, playerData) => {
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
    },
    [setLoading, setError, setPlayers]
  );

  const deletePlayer = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const result = await playersApi.deletePlayer(id);
        await fetchPlayers();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fetchPlayers]
  );

  const bulkUploadPlayers = useCallback(
    async (file, onProgress) => {
      setLoading(true);
      setError(null);

      try {
        const result = await playersApi.bulkUploadPlayers(file, onProgress);
        await fetchPlayers();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fetchPlayers]
  );

  return {
    searchPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    bulkUploadPlayers,
  };
};
