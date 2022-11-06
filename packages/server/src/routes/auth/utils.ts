import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { env } from "../../env/server";
import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";

export enum jwtType {
  ACCESS = "access",
  REFRESH = "refresh",
}

const signToken = (
  type: jwtType,
  payload: Record<string, any>,
  expiresIn: number
): Promise<string> => {
  const secret =
    type === jwtType.ACCESS
      ? env.JWT_ACCESS_TOKEN_SECRET
      : env.JWT_REFRESH_TOKEN_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        logger(["error", err]);
        return reject(
          new Error("Error while signing token. Please try again later.")
        );
      }

      return resolve(token as string);
    });
  });
};

const verifyToken = (type: jwtType, token: string) => {
  const secret =
    type === jwtType.ACCESS
      ? env.JWT_ACCESS_TOKEN_SECRET
      : env.JWT_REFRESH_TOKEN_SECRET;
  let user: JwtPayload | boolean | string | undefined;

  // @ts-ignore
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      logger(["error", err]);
      user = false;
    }
    user = decoded;
  });
  return user;
};

export { signToken, verifyToken };
