export declare const user: {
    getMe: () => Promise<User>;
    create: (user: {
        username: string;
        password: string;
    }) => Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
};
