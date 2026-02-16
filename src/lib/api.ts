export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://finvault-production.up.railway.app";

export const apiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};