import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-finance-manager-xb6n.onrender.com",
});

export default api;