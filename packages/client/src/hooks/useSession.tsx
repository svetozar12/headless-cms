import { parseCookies } from "nookies";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../utils/auth";

const useSession = () => {
  const cookie = parseCookies();
  const query = useQuery(
    ["session"],
    () => api.user.me.get(cookie.accessToken as string),
    {}
  );
  useQuery(["refresh"], () => checkAuth(cookie.refreshToken as string));

  return query;
};

export default useSession;
