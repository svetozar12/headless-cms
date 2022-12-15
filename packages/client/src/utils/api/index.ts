// src/utils/api.ts
import axios from "axios";
import { env } from "../../env/env";
//resources
import { user } from "./resources/user";
import { auth } from "./resources/auth";
import { content } from "./resources/content/content";
import { contentModel } from "./resources/contentModel/contentModel";

const api = {
  user,
  auth,
  content,
  contentModel,
};

export default api;
