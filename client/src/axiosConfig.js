import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5173/api",
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("🔥 Admin Token Sent →", token);
  } else {
    console.log("❌ No Token Found in LocalStorage");
  }

  return req;
});

export default API;
