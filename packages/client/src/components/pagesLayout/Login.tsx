import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useState } from "react";
import z from "zod";
import { CONTENT_MODELS, REGISTER } from "../../constants/routes";
import api from "../../utils/api";
import Button from "../Button";
import FormWrapper from "../FormWrapper";
import Heading from "../Heading";
import Input from "../Input";
import Spinner from "../Spinner";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

const Login: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isParse = schema.safeParse({ username, password });
      if (!isParse.success) {
        const formatError = isParse.error.issues;
        formatError.forEach((err) => {
          throw new Error(err.message);
        });
      } else {
        const { data } = isParse;
        const res = await api.auth.auth("password", data);
        setCookie(null, "accessToken", res.accessToken);
        setCookie(null, "refreshToken", res.refreshToken);
        Router.push(CONTENT_MODELS);
      }
    } catch (e: any) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper error={error}>
      <Spinner isLoading={isLoading} />
      <Heading type="h1" text="Sign in" />
      <p className="text-center text-sm text-white">
        Don&apos;t have account ?{" "}
        <Link href={REGISTER}>
          <span className="cursor-pointer text-textPurple">Register here</span>
        </Link>
      </p>
      <Input
        value={username}
        name="username"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        value={password}
        name="password"
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
    </FormWrapper>
  );
};

export default Login;
