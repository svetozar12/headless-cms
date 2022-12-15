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
  const { headers } = options || {};
  console.log(token, "AUTH TOKEN");

  if (token) {
    authHeader.Authorization = `Bearer ${token}`;
  }
  console.log({ ...authHeader, ...headers });

  try {
    instance.request({ headers: { Authorization: `Bearer ${token}` } });
    const res = await instance[method](path, data);
    return reqObject ? res.data[reqObject] : res.data;
  } catch (error) {
    return error as any;
  }
};
