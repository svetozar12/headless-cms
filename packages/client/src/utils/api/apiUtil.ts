import { AxiosRequestConfig } from "axios";
import { instance } from ".";
export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}
export const makeRequest = async <T>(
  method: Method,
  path: string,
  reqObject?: string,
  data?: any,
  token?: string,
  options?: AxiosRequestConfig<any> | undefined
): Promise<T> => {
  let authHeader = { Authorization: "" };
  if (token) {
    authHeader.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await instance[method](path, data, {
      ...options,
      headers: { ...authHeader, ...options?.headers },
    });
    return reqObject ? res.data[reqObject] : res.data;
  } catch (error) {
    return error as any;
  }
};
