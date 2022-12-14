import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../constants/routes";
import { logout } from "../utils/auth";
import { useCookie } from "next-cookie";
import Spinner from "packages/client/src/components/Spinner";

const Logout = () => {
  const { isLoading } = useLogout();
  return (
    <div className="relative h-screen w-screen">
      <Spinner isLoading={isLoading} />
      Logging out
    </div>
  );
};

export default Logout;

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const cookie = useCookie();

  useEffect(() => {
    logout(cookie).finally(async () => {
      await router.push(LOGIN);
      setIsLoading(false);
    });
  }, []);

  return { isLoading };
};
