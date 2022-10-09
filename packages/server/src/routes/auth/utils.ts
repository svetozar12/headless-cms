import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { env } from "../../env/server";

export enum jwtType {
  ACCESS = "access",
  REFRESH = "refresh",
}

const signToken = (
  type: jwtType,
  payload: Record<string, any>,
  expiresIn: number,
) => {
  const secret =
    type === jwtType.ACCESS
      ? env.JWT_ACCESS_TOKEN_SECRET
      : env.JWT_REFRESH_TOKEN_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        console.log(err, "error");

        return reject(
          new TRPCError({
            code: "FORBIDDEN",
            message: "Token has expired or invalid secret",
          }),
        );
      }
      console.log(token, "TOKEN");

      return resolve(token);
    });
  });
};

const verifyToken = (token: string, type: jwtType) => {
  const secret =
    type === jwtType.ACCESS
      ? env.JWT_ACCESS_TOKEN_SECRET
      : env.JWT_REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export { signToken, verifyToken };
