// src/utils/api.ts
import axios from "axios";
import { env } from "../../env/env";
//resources
import auth from "./resources/auth";
import ContentModel from "./resources/contentModel";
import user from "./resources/user";

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

export const instance = axios.create({
  baseURL: apiHost,
});

const api = {
  user,
  auth,
  ContentModel,
};

export default api;
