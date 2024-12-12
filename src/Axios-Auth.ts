import axios from "axios";
import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from "axios";

const url = import.meta.env.VITE_BASE_URL_API;

const conf: AxiosRequestConfig = {
  baseURL: url,
  timeout: 1000 * 60 * 2,
};

const HTTP: AxiosInstance = axios.create(conf);

HTTP.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem("appToken");
  if (config && config.headers)
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// HTTP.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.error("test error");
//     return Promise.reject(error);
//   }
// );

HTTP.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      console.log("adm/showModalError", "Acesso não permitido!");
    }
    if (error.response && error.response.status === 500) {
      console.log(
        "adm/showModalError",
        "Servidor não responde! Tente mais tarde."
      );
    }

    if (
      (error.response && error.response.status === 408) ||
      error.code === "ECONNABORTED"
    ) {
      const message = "Tempo excedido para obter os dados! Tente novamente.";
      console.log("adm/showModalError", message);
    }
    if (error.response && error.response.status === 401) {
      // Usuario nao logado
      console.log("adm/logout");
    }
    if (!error.response) {
      console.log("adm/showModalError", "Falha de conexão! Tente novamente.");
    }
    return Promise.reject(error);
  }
);

export default HTTP;
