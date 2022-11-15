import Link from "next/link";
import Router from "next/router";
import { setCookie } from "nookies";
import Input from "../Input";
import { useState } from "react";
import z from "zod";
import api from "../../utils/api";
import FormWrapper from "../FormWrapper";
import Heading from "../Heading";
import { LOGIN } from "../../constants/routes";
import Button from "../Button";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

const Register: React.FunctionComponent = () => {
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
    <FormWrapper error={error}>
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
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <Input
        value={password}
        name="password"
        type="password"
        placeholder="password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        text="Register"
        onClick={handleSubmit}
        isDisabled={!username || !password}
      />
    </FormWrapper>
  );
}

export default Register;
