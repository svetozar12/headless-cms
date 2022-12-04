import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../utils/api";
import { useCookie } from "next-cookie";
import { checkAuth } from "../utils/auth";
//gets user data from api and refresh token if possible
const useSession = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const cookie = useCookie();
  const query = useQuery(["session"], () =>
    api.user.getMe(cookie.get("accessToken"))
  );

  const setTokens = async () => {
    try {
      const auth = await checkAuth(cookie.get("refreshToken"));
      if (typeof auth !== "boolean") {
        const { accessToken, refreshToken } = auth;
        if (accessToken && refreshToken) {
          setIsLogged(true);
          cookie.set("accessToken", accessToken);
          cookie.set("refreshToken", refreshToken);
        }
      }
    } catch {
      setIsLogged(false);
      // cookie.remove("accessToken");
      // cookie.remove("refreshToken");
    }
  };

  return { ...query, user: query.data, isLogged, setTokens };
};

export default useSession;
