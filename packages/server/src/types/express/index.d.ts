// src/types/express/index.d.ts

// to make the file a module and avoid the TypeScript error
import { Content, ContentModel, User } from "../../utils/prisma";

export {};

type UserMe = Omit<User, "password">;

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
      };
      pre: {
        user: UserMe;
        content: Content;
        model: ContentModel;
      };
    }
  }
}
