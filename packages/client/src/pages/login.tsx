import { isAlreadyAuth } from "../utils/auth";
import { NextPage } from "next";
import { useState } from "react";
import api from "../utils/api";
import { setCookie } from "nookies";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Link from "next/link";
import { REGISTER } from "../constants/routes";

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.auth.auth("password", { username, password });
      setCookie(null, "accessToken", res.accessToken);
      setCookie(null, "refreshToken", res.refreshToken);
      await Router.push("/");
    } catch {
      return false;
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-mainBlack ">
      <form className="flex h-2/4 w-5/6 flex-col justify-center gap-3 rounded-md bg-offBlack py-5 px-10 md:w-3/4 xl:w-2/4">
        <Heading type="h1" text="Sign in" />
        <p className="text-center text-sm text-white">
          Don&apos;t have account ?{" "}
          <Link href={REGISTER}>
            <span className="cursor-pointer text-textPurple">
              Register here
            </span>
          </Link>
        </p>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          text="Login"
          onClick={handleSubmit}
          isDisabled={!username || !password}
        />
      </form>
    </div>
  );
};
export const getServerSideProps = isAlreadyAuth();

export default LoginPage;
