import apiClient from "./apiClient";
import { API_ENDPOINTS, API_MESSAGES } from "../constants/apiEndpoints";

export const playersApi = {
  getPlayers: async (params = {}) => {
    try {
      const {
        page = 0,
        size = 10,
        sortBy = null,
        sortDirection = "asc",
        ...filters
      } = params;

      const skip = page * size;
      const top = size;

      const queryParams = new URLSearchParams({
        skip: skip.toString(),
        top: top.toString(),
        ...(sortBy && { sortBy, sortDirection }),
        ...Object.fromEntries(
          Object.entries(filters).filter(
            ([_, v]) => v !== null && v !== undefined && v !== ""
          )
        ),
      });

      const url = `${API_ENDPOINTS.PLAYERS.GET_ALL}?${queryParams}`;
      const response = await apiClient.get(url);

      if (response && response.data && Array.isArray(response.data)) {
        const totalElements = response.total || 0;
        const currentPage = Math.floor(response.skip / response.top);
        const totalPages = Math.ceil(totalElements / response.top);

        return {
          content: response.data,
          totalElements,
          totalPages,
          number: currentPage,
          size: response.top,
          first: response.skip === 0,
          last: !response.hasMore,
          numberOfElements: response.data.length,
        };
      }

      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: size,
        first: true,
        last: true,
        numberOfElements: 0,
      };
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },

  getAllPlayers: async (params = {}) => {
    try {
      const response = await playersApi.getPlayers({ ...params, size: 1000 });
      return response.content;
    } catch (error) {
      console.error("Error fetching all players:", error);
      throw error;
    }
  },

  searchPlayers: async (searchCriteria, paginationParams = null) => {
    try {
      let url;

      if (paginationParams) {
        const {
          page = 0,
          size = 10,
          sortBy = null,
          sortDirection = "asc",
        } = paginationParams;
        const queryParams = new URLSearchParams({
          skip: (page * size).toString(),
          top: size.toString(),
          ...(sortBy && { sortBy, sortDirection }),
        });
        url = `${API_ENDPOINTS.PLAYERS.SEARCH}?${queryParams}`;
      } else {
        url = API_ENDPOINTS.PLAYERS.SEARCH;
      }

      const response = await apiClient.post(url, searchCriteria);

      if (response && response.data && Array.isArray(response.data)) {
        const totalElements = response.total || 0;

        return {
          content: response.data,
          totalElements,
          totalPages: 1,
          number: 0,
          size: response.data.length,
          first: true,
          last: true,
          numberOfElements: response.data.length,
        };
      }

      if (Array.isArray(response)) {
        return {
          content: response,
          totalElements: response.length,
          totalPages: 1,
          number: 0,
          size: response.length,
          first: true,
          last: true,
          numberOfElements: response.length,
        };
      }

      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 0,
        first: true,
        last: true,
        numberOfElements: 0,
      };
    } catch (error) {
      console.error("Error searching players:", error);
      throw error;
    }
  },

  getPlayerById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PLAYERS.GET_BY_ID(id));
      return response;
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error;
    }
  },

  createPlayer: async (playerData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.PLAYERS.CREATE,
        playerData
      );
      return {
        success: true,
        data: response,
        message: API_MESSAGES.SUCCESS.PLAYER_CREATED,
      };
    } catch (error) {
      console.error("Error creating player:", error);
      throw error;
    }
  },

  updatePlayer: async (id, playerData) => {
    try {
      const response = await apiClient.put(
        API_ENDPOINTS.PLAYERS.UPDATE(id),
        playerData
      );
      return {
        success: true,
        data: response,
        message: API_MESSAGES.SUCCESS.PLAYER_UPDATED,
      };
    } catch (error) {
      console.error(`Error updating player ${id}:`, error);
      throw error;
    }
  },

  deletePlayer: async (id) => {
    try {
      await apiClient.delete(API_ENDPOINTS.PLAYERS.DELETE(id));
      return {
        success: true,
        message: API_MESSAGES.SUCCESS.PLAYER_DELETED,
      };
    } catch (error) {
      console.error(`Error deleting player ${id}:`, error);
      throw error;
    }
  },

  bulkUploadPlayers: async (file, onProgress = () => {}) => {
    try {
      const response = await apiClient.uploadFile(
        API_ENDPOINTS.PLAYERS.BULK_UPLOAD,
        file,
        onProgress
      );

      return {
        success: true,
        data: response,
        count: response?.count || 0,
        message: API_MESSAGES.SUCCESS.BULK_UPLOAD_SUCCESS,
      };
    } catch (error) {
      console.error("Error uploading players:", error);
      throw error;
    }
  },

  getCountries: async () => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.BASE_URL}/countries`
      );
      return response || [];
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },

  getPositions: async () => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.BASE_URL}/positions`
      );
      return response || [];
    } catch (error) {
      console.error("Error fetching positions:", error);
      throw error;
    }
  },
};

export default playersApi;
