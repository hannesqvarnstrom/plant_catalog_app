import axios from "axios";
import { useUsersStore } from "./store/users";
type HTTPAgent = ReturnType<typeof axios.create>;
const httpAgent: HTTPAgent = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
});

httpAgent.interceptors.request.use(
  (config) => {
    const currentUser = useUsersStore.getState().getCurrentUser();
    if (currentUser) {
      config.headers.authorization = currentUser.tokenHeader.authorization;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default httpAgent;
