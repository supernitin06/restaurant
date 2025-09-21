import axios from "axios";

// Use NEXT_PUBLIC_KEY from env or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_KEY || "http://127.0.0.1:8000/api";

/**
 * Create an Axios instance
 */
function createRequest({ headers = {}, params = {}, authToken }) {
  return axios.create({
    baseURL: API_BASE_URL,
    responseType: "json",
    crossdomain: true,
    headers: {
      "Content-Type": headers["Content-Type"] || "application/json",
      Accept: "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    params,
  });
}

/**
 * Centralized error handler
 */
export const handleCatchBlock = (error) => {
  console.error("API Error:", error);
  return {
    error: true,
    message:
      error.message === "Network Error"
        ? "Unable to reach the server. Please check your network connection."
        : error.response?.data || "An unexpected error occurred. Please try again.",
  };
};

/**
 * API handler function
 */
export async function apiHandler({ url, method = "GET", headers, data, params, authToken }) {
  try {
    const request = createRequest({ headers, params, authToken });
    let response;

    switch (method.toUpperCase()) {
      case "POST":
        response = await request.post(url, data);
        break;
      case "PUT":
        response = await request.put(url, data);
        break;
      case "DELETE":
        response = await request.delete(url, { data });
        break;
      default:
        response = await request.get(url);
    }

    return { data: response.data, headers: response.headers };
  } catch (error) {
    return handleCatchBlock(error);
  }
}
