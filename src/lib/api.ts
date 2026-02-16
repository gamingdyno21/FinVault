export const API_BASE_URL = import.meta.env.PROD
    ? "https://finvault-production.up.railway.app"
    : "http://localhost:5000";

export const apiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};