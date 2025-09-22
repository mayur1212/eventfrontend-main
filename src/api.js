// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://eventbackend-main.onrender.com/api");

export default API_BASE_URL;
