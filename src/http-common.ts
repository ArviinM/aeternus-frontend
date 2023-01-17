import axios from "axios";
export default axios.create({
  baseURL: "https://aeternus-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
