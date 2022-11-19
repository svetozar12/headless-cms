import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import { useEffect } from "react";
import api from "../utils/api";
import { checkAuth } from "../utils/auth";
//gets user data from api and refresh token if possible
const useSession = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
  }, []);

  const cookie = parseCookies();
  const query = useQuery(["session"], () =>
    api.user.getMe(cookie.accessToken as string)
  );
  useQuery(["refresh"], () => checkAuth(cookie.refreshToken as string));

  return { ...query, user: query.data, isLoggedIn: !!query.data };
};

export default useSession;
