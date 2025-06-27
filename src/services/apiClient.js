import {
  API_ENDPOINTS,
  HTTP_STATUS,
  API_MESSAGES,
} from "../constants/apiEndpoints";

class ApiClient {
  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL;
  }

  async request(url, options = {}) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(await this.handleErrorResponse(response));
      }

      if (response.status === HTTP_STATUS.NO_CONTENT) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(API_MESSAGES.ERROR.NETWORK_ERROR);
      }
      throw error;
    }
  }

  async handleErrorResponse(response) {
    try {
      const errorData = await response.json();
      return errorData.message || this.getDefaultErrorMessage(response.status);
    } catch {
      return this.getDefaultErrorMessage(response.status);
    }
  }

  getDefaultErrorMessage(status) {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return API_MESSAGES.ERROR.INVALID_DATA;
      case HTTP_STATUS.NOT_FOUND:
        return API_MESSAGES.ERROR.PLAYER_NOT_FOUND;
      case HTTP_STATUS.CONFLICT:
        return API_MESSAGES.ERROR.PLAYER_EXISTS;
      default:
        return "An unexpected error occurred";
    }
  }

  async get(endpoint) {
    return this.request(endpoint, {
      method: "GET",
    });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }

  async uploadFile(endpoint, file, onProgress = () => {}) {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve(null);
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error(API_MESSAGES.ERROR.NETWORK_ERROR));
      });

      xhr.open("POST", endpoint);
      xhr.send(formData);
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
