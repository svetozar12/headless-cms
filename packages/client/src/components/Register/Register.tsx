import { useCookie } from "next-cookie";
import Router from "next/router";
import { useRef, useState } from "react";
import z from "zod";
import api from "../../utils/api";
import { Button, Form } from "@headless-cms/ui";
import Header from "./subcomponents/Header";
import { getFields } from "./utils";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

const Register: React.FunctionComponent = () => {
  const { username, password } = useValues();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cookie = useCookie();

  const handleSubmit = async (e: any) => {
    const { value: usernameValue } = username.current || {};
    const { value: passwordValue } = password.current || {};

    e.preventDefault();
    setIsLoading(true);
    try {
      const isParse = schema.safeParse({
        username: usernameValue,
        password: passwordValue,
      });
      if (!isParse.success) {
        const formatError = isParse.error.issues;
        formatError.forEach((err) => {
          throw new Error(err.message);
        });
      } else {
        const { data } = isParse;
        const res = await api.user.create(data);

        cookie.set("accessToken", res.accessToken);
        cookie.set("refreshToken", res.refreshToken);
        await Router.push("/");
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
    <div className="flex h-screen w-full items-center justify-center bg-mainBlack">
      <div className="w-5/6 bg-offBlack md:w-2/4 xl:w-2/5">
        <Form
          formHeader={<Header />}
          fields={getFields({ username, password })}
          error={error}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          customFormButtons={
            <Button type="submit" text="Sign up" onClick={handleSubmit} />
          }
        />
      </div>
    </div>
  );
};

export default Register;

const useValues = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  return { username, password };
};
