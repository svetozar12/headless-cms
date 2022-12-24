import { AxiosRequestConfig } from "axios";
declare const METHOD: {
    readonly GET: "get";
    readonly POST: "post";
    readonly PUT: "put";
    readonly DELETE: "delete";
};
type ObjectValues<T> = T[keyof T];
export type Method = ObjectValues<typeof METHOD>;
export declare const initApi: (protocol?: string, host?: string, port?: number) => void;
export declare const makeRequest: <T>(method: Method, path: string, reqObject?: string, data?: any, options?: AxiosRequestConfig<any> | undefined) => Promise<T>;
export declare const setToken: (token: string) => void;
export {};
