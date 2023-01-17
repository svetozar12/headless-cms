import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import z from "zod";
import { CONTENT_MODELS } from "../../constants/routes";
import api from "../../utils/sdk";
import Header from "./subcomponents/Header";
import { getFields } from "./utils";
import Form from "../Form";
import Heading from "../Heading";
import Button from "../Button";
import { signIn, signOut, useSession } from "next-auth/react";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

const Login: React.FunctionComponent = () => {
  const { username, password } = useValues();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: sessionData } = useSession();
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const { value: usernameValue } = username.current || {};
  //   const { value: passwordValue } = password.current || {};

  //   try {
  //     const isParse = schema.safeParse({
  //       username: usernameValue,
  //       password: passwordValue,
  //     });
  //     if (!isParse.success) {
  //       const formatError = isParse.error.issues;

  //       formatError.forEach((err) => {
  //         throw new Error(err.message);
  //       });
  //     } else {
  //       const { data } = isParse;
  //       const res = await api.auth.auth("password", data);
  //       const expiresIn = new Date();
  //       expiresIn.setHours(expiresIn.getHours() + 1);
  //       cookie.set("accessToken", res.accessToken, {
  //         expires: expiresIn,
  //         maxAge: 7200,
  //       });
  //       cookie.set("refreshToken", res.refreshToken, {
  //         expires: expiresIn,
  //         maxAge: 7200,
  //       });
  //       await router.push(CONTENT_MODELS);
  //     }
  //   } catch (e: any) {
  //     setError(e.message);
  //     setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="bg-mainBlack flex h-screen w-full items-center justify-center">
      <div className="bg-offBlack w-5/6 md:w-2/4 xl:w-2/5">
        <Heading text="Sign in" type="h2" />
        <button type="button" onClick={() => void signIn()}>
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Login;

const useValues = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  return { username, password };
};
