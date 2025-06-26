import apiClient from "./apiClient";
import { API_ENDPOINTS, API_MESSAGES } from "../constants/apiEndpoints";

export const playersApi = {
  // Get all players
  getAllPlayers: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString
        ? `${API_ENDPOINTS.PLAYERS.GET_ALL}?${queryString}`
        : API_ENDPOINTS.PLAYERS.GET_ALL;

      const response = await apiClient.get(url);
      return response || [];
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },

  // Get player by ID
  getPlayerById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PLAYERS.GET_BY_ID(id));
      return response;
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error;
    }
  },

  // Create new player
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

  // Update existing player
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

  // Delete player
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

  // Bulk upload players from CSV
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

  // Search players
  searchPlayers: async (searchParams) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const url = `${API_ENDPOINTS.PLAYERS.SEARCH}?${queryString}`;

      const response = await apiClient.get(url);
      return response || [];
    } catch (error) {
      console.error("Error searching players:", error);
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

  // Get all positions
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
