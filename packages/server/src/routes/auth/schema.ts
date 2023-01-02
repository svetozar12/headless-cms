import { z } from "zod";

const authSchema = z.object({
  body: z
    .object({
      username: z.string(),
      password: z.string(),
      refreshToken: z.string(),
      grant_type: z.enum(["password", "refresh_token"]),
    })
    .partial()
    .refine((data) => {
      if (data.grant_type === "password") {
        return (
          data.username && data.password,
          { message: "Invalid username or password" }
        );
      } else if (data.grant_type === "refresh_token") {
        return data.refreshToken, { message: "Invalid refresh token" };
      }
      return false;
    }),
});

export { authSchema };
