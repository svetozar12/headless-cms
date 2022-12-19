import { JwtPayload } from "jsonwebtoken";
export declare enum jwtType {
    ACCESS = "access",
    REFRESH = "refresh"
}
declare const signToken: (type: jwtType, payload: Record<string, any>, expiresIn: number) => Promise<string>;
declare const verifyToken: (type: jwtType, token: string) => string | boolean | JwtPayload | undefined;
export { signToken, verifyToken };
