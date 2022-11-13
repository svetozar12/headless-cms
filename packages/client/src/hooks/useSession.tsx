import { parseCookies } from "nookies";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nookies from "nookies"
//gets user data from api and refresh token if possible
const useSession = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
  }, [])
  const cookie = parseCookies();
  const router = useRouter();
  const query = useQuery(["session"], () =>
    api.user.getMe(cookie.accessToken as string)
  );
  useQuery(["refresh"], () => checkAuth(cookie.refreshToken as string));

  return { ...query, user: query.data, isLoggedIn: !!query.data };
};

export default useSession;
