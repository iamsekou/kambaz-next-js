import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000",
  withCredentials: true,
});

export default api;
