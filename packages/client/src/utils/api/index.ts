// src/utils/api.ts
import axios from "axios";
import { env } from "../../env/env";
//resources
import user from "./resources/user";
import auth from "./resources/auth";

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

export const instance = axios.create({
  baseURL: apiHost,
});

const api = {
  user,
  auth,
};

export default api;
