import { useState, useEffect, useCallback, useMemo } from "react";
import { playersApi } from "../../services/playersApi";
import usePagination from "../usePagination";
import { usePlayerOperations } from "./operations";

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
  const filtersString = useMemo(
    () => JSON.stringify(currentFilters),
    [currentFilters]
  );

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

  const playerOperations = usePlayerOperations({
    setLoading,
    setError,
    setPlayers,
    setPaginationData,
    pagination,
    fetchPlayers,
  });

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
  }, [doFetch, filtersString, currentFilters]);

  return {
    players,
    loading,
    error,

    pagination: {
      ...pagination,
      ...paginationData,
    },

    fetchPlayers,
    changePage,
    changePageSize,
    clearFilters,
    clearError,
    currentFilters,

    ...playerOperations,
  };
};

export default usePlayersData;
