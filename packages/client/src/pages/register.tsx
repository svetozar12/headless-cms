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
import { LOGIN } from "../constants/routes";
import FormWrapper from "../components/FormWrapper";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

const RegisterPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const isParse = schema.safeParse({ username, password });
      if (!isParse.success) {
        const formatError = isParse.error.issues;
        formatError.forEach((err) => {
          throw new Error(err.message);
        });
      } else {
        const { data } = isParse;
        const res = await api.user.create(data);
        setCookie(null, "accessToken", res.accessToken);
        setCookie(null, "refreshToken", res.refreshToken);
        await Router.push("/");
      }
    } catch (e: any) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log(e, "error");
      return false;
    }
  };

  return (
    <FormWrapper>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <Heading type="h1" text="Register" />
      <p className="text-center text-sm text-white">
        Already registered ?{" "}
        <Link href={LOGIN}>
          <span className="cursor-pointer text-textPurple">SignIn here</span>
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
        text="Register"
        onClick={handleSubmit}
        isDisabled={!username || !password}
      />
    </FormWrapper>
  );
};
export const getServerSideProps = isAlreadyAuth();

export default RegisterPage;
