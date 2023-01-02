import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../utils/api";
import { useCookie } from "next-cookie";
import { checkAuth } from "../utils/auth";
import axios from "axios";
import { IAuthResource } from "packages/client/src/utils/api/resources/auth";
//gets user data from api and refresh token if possible
const useSession = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const cookie = useCookie();
  const query = useQuery(["session"], () => api.user.getMe());

  const setTokens = async () => {
    try {
      const auth = (await checkAuth(
        cookie.get("refreshToken")
      )) as IAuthResource;
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
    } finally {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
        "accessToken"
      )}`;
    }
  };

  return { ...query, user: query.data, isLogged, setTokens };
};

export default useSession;
