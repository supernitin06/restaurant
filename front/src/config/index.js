// api.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_KEY||'http://127.0.0.1:8000/api';
async function createRequest({ headers, params, authToken }) {
  return axios.create({
    baseURL: API_BASE_URL,
    responseType: "json",
    crossdomain: true,
    headers: {
      "Content-Type": headers?.["Content-Type"] || "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
      ...headers,
    },
    params,
  });
}



export const handleCatchBlock = () => {
  console.log("Something went wrong fetching apis");
};
export async function apiHandler({
  url,
  method,
  headers: reqHeaders,
  data: jsonData,
  params,
  authToken,
}) {
  try {
    const request = await createRequest({ headers: reqHeaders, params, authToken });
    let result = [];
    switch (method) {
      case "POST":
        result = await request.post(url, jsonData);
        break;
      case "DELETE":
        result = await request.delete(url);
        break;
      case "PUT":
        result = await request.put(url, jsonData);
        break;
      default:
        result = await request.get(url);
    }
    const { data, headers } = result;
    return { data, headers };
  } catch (error) {
    if (error.message === 'Network Error') {
      return {
        error: true,
        message: 'Unable to reach the server. Please check your network connection or try again later.',
      };
    }
    if (error.response) {
      const { data, headers } = error.response;
      return { data, headers };
    }
    return {
      error: true,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}


//  const fetchSearchResults = useCallback(async () => {
//     if (!searchInput.trim()) return;

//     try {
//       const { data } = await apiHandler({
//         url: `${API_ENDPOINTS.SEARCHBOOKS}${encodeURIComponent(searchInput)}`,
//         method: "GET",
//       });
//       setSearchResults(data || []);
//     } catch (error) {
//       console.error("Error fetching book detail:", error);
//     }
//   }, [searchInput]);