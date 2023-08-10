// const PRODUCTION_API_BASE_URL = "https://volunteerverse-backend.onrender.com";
const PRODUCTION_API_BASE_URL = undefined;
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";

export const API_BASE_URL = PRODUCTION_API_BASE_URL || DEVELOPMENT_API_BASE_URL;
