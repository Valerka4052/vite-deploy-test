import axios from "axios";
const instance = axios.create({ baseURL: 'https://backend-practice-5k0t.onrender.com' });
instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
    return config;
});
export default instance;