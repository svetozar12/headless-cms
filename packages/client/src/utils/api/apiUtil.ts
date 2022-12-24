import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { env } from "../../env/env";
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
} as const;
type ObjectValues<T> = T[keyof T];
export type Method = ObjectValues<typeof METHOD>;

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;
