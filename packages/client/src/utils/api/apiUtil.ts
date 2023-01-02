import axios, { AxiosRequestConfig } from "axios";
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
} as const;
type ObjectValues<T> = T[keyof T];
export type Method = ObjectValues<typeof METHOD>;

let apiHost: string;

export const initApi = (protocol = "http", host = "localhost", port = 5000) => {
  apiHost = `${protocol}://${host}:${port}`;
};

export const makeRequest = async <T>(
  method: Method,
  path: string,
  reqObject?: string,
  data?: any,
  options?: AxiosRequestConfig<any> | undefined,
): Promise<T> => {
  if (!apiHost) throw new Error("Please initialize sdk");
  try {
    const res = await axios[method](`${apiHost}${path}`, data, options);
    return reqObject ? res.data[reqObject] : res.data;
  } catch (error) {
    let errorMessage = "Internal Sdk error";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data.message;
    }
    throw new Error(errorMessage);
  }
};
export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
