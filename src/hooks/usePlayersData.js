import { useState, useEffect, useCallback } from "react";
import { playersApi } from "../services/playersApi";
import usePagination from "./usePagination";

const usePlayersData = (initialParams = {}) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationData, setPaginationData] = useState({
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  });

  const pagination = usePagination({
    initialPage: initialParams.page || 0,
    initialPageSize: initialParams.size || 10,
    totalCount: paginationData.totalElements,
  });

  const [currentFilters, setCurrentFilters] = useState({});

  const doFetch = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);

      try {
        const requestParams = {
          page: pagination.currentPage,
          size: pagination.pageSize,
          sort: "lastName,asc",
          ...currentFilters,
          ...params,
        };

        const response = await playersApi.getPlayers(requestParams);

        setPlayers(response.content);
        setPaginationData({
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          first: response.first,
          last: response.last,
          numberOfElements: response.numberOfElements,
        });
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch players:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.currentPage, pagination.pageSize, currentFilters]
  );

  const fetchPlayers = useCallback(
    (params = {}) => {
      return doFetch(params);
    },
    [doFetch]
  );

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
        setCurrentFilters(searchCriteria);
      } catch (err) {
        setError(err.message);
        console.error("Failed to search players:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination]
  );

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
    [fetchPlayers]
  );

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
    [fetchPlayers]
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
    [fetchPlayers]
  );

  const changePage = useCallback(
    (newPage) => {
      pagination.goToPage(newPage);
    },
    [pagination]
  );

  const changePageSize = useCallback(
    (newSize) => {
      pagination.changePageSize(newSize);
    },
    [pagination]
  );

  const clearFilters = useCallback(() => {
    setCurrentFilters({});
    pagination.reset();
  }, [pagination]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (Object.keys(currentFilters).length === 0) {
      doFetch();
    }
  }, [doFetch, currentFilters]);

  return {
    players,
    loading,
    error,

    pagination: {
      ...pagination,
      ...paginationData,
    },

    fetchPlayers,
    searchPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    bulkUploadPlayers,
    changePage,
    changePageSize,
    clearFilters,
    clearError,

    currentFilters,
  };
};

export default usePlayersData;
