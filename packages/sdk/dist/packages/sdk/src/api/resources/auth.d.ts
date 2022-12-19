import { User } from "@headless-cms/server";
interface IAuth {
    user: User;
    accessToken: string;
    refreshToken: string;
}
export declare const auth: {
    auth: (grant_type: "password" | "refresh_token", password?: {
        username: string;
        password: string;
    } | undefined, refreshToken?: string) => Promise<IAuth>;
};
export {};
