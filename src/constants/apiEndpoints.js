const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8081/api";

export const API_ENDPOINTS = {
  BASE_URL,

  PLAYERS: {
    BASE: `${BASE_URL}/players`,
    GET_ALL: `${BASE_URL}/players`,
    GET_BY_ID: (id) => `${BASE_URL}/players/${id}`,
    CREATE: `${BASE_URL}/players`,
    UPDATE: (id) => `${BASE_URL}/players/${id}`,
    DELETE: (id) => `${BASE_URL}/players/${id}`,
    BULK_UPLOAD: `${BASE_URL}/players/bulk`,
    SEARCH: `${BASE_URL}/players/search`,
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_MESSAGES = {
  SUCCESS: {
    PLAYER_CREATED: "Player created successfully",
    PLAYER_UPDATED: "Player updated successfully",
    PLAYER_DELETED: "Player deleted successfully",
    BULK_UPLOAD_SUCCESS: "Players uploaded successfully",
  },
  ERROR: {
    NETWORK_ERROR: "Network error. Please check your connection.",
    PLAYER_EXISTS: "Player with same name and birth date already exists",
    INVALID_DATA: "Invalid data provided",
    PLAYER_NOT_FOUND: "Player not found",
    BULK_UPLOAD_ERROR: "Error uploading players file",
  },
};
