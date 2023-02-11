import { useCookie } from "next-cookie";

const useCookies = () => {
  const cookie = useCookie();
  const accessToken: string = cookie.get("accessToken");
  const refreshToken: string = cookie.get("refreshToken");
  return { accessToken, refreshToken, cookie };
};

export default useCookies;
