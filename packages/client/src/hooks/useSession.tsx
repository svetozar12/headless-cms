import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { checkAuth } from "../utils/auth";
//gets user data from api and refresh token if possible
const useSession = () => {
  const router = useRouter();
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
    checkAuth(cookie.refreshToken as string).then((isLoggedIn) => {
      setIsLogged(isLoggedIn);
      return isLoggedIn;
    })
  );
  return { ...query, user: query.data, isLogged };
};

export default useSession;
