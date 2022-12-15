import axios, { AxiosRequestConfig } from "axios";
import { env } from "../../env/env";
export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

export const makeRequest = async <T>(
  method: Method,
  path: string,
  reqObject?: string,
  data?: any,
  token?: string,
  options?: AxiosRequestConfig<any> | undefined
): Promise<T> => {
  try {
    const res = await axios[method](`${apiHost}${path}`, data);
    return reqObject ? res.data[reqObject] : res.data;
  } catch (error) {
    return error as any;
  }
};
export const setToken = (token: string) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
