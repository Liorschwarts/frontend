import { useState, useCallback, useMemo } from "react";

const usePagination = ({
  initialPage = 0,
  initialPageSize = 10,
  totalCount = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNext = currentPage < totalPages - 1;
    const hasPrevious = currentPage > 0;
    const startIndex = currentPage * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);

    return {
      currentPage,
      pageSize,
      totalPages,
      totalCount,
      hasNext,
      hasPrevious,
      startIndex,
      endIndex,
      offset: startIndex,
      limit: pageSize,
    };
  }, [currentPage, pageSize, totalCount]);

  const goToPage = useCallback(
    (page) => {
      if (page >= 0 && page < paginationInfo.totalPages) {
        setCurrentPage(page);
      }
    },
    [paginationInfo.totalPages]
  );

  const nextPage = useCallback(() => {
    if (paginationInfo.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [paginationInfo.hasNext]);

  const previousPage = useCallback(() => {
    if (paginationInfo.hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [paginationInfo.hasPrevious]);

  const changePageSize = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    ...paginationInfo,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    reset,
  };
};

export default usePagination;
