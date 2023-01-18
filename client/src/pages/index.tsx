import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  useEffect(() => {
    signIn();
  }, []);

  return <></>;
};

export default LoginPage;
