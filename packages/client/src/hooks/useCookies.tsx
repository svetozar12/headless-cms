import { useCookie } from "next-cookie";

const useCookies = () => {
  const cookie = useCookie();
  const { get } = cookie;
  const accessToken: string = get("accessToken");
  const refreshToken: string = get("refreshToken");
  return { accessToken, refreshToken, cookie };
};

export default useCookie;
