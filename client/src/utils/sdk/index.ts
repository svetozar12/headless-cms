//resources
import { user } from "./resources/user";
import { auth } from "./resources/auth";
import { content } from "./resources/content/content";
import { contentModel } from "./resources/contentModel/contentModel";
import { initApi } from "./apiUtil";

const api = {
  user,
  auth,
  content,
  contentModel,
};
export * from "./apiUtil";
initApi();
export default api;
