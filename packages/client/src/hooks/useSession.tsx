import { useQuery } from "@tanstack/react-query";
import nookies, { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { checkAuth, logout } from "../utils/auth";
//gets user data from api and refresh token if possible
const useSession = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
  }, []);

  const cookie = parseCookies();
  const query = useQuery(["session"], () =>
    api.user.getMe(cookie.accessToken as string)
  );
  useQuery(["refresh"], () =>
    checkAuth(cookie.refreshToken as string).then((user: any) => {
      setIsLogged(!!user);

      if (user) {
        const { accessToken, refreshToken } = user;
        setCookie(null, "accessToken", accessToken);
        setCookie(null, "refreshToken", refreshToken);
      }
      return user;
    })
  );
  return { ...query, user: query.data, isLogged };
};

export default useSession;
