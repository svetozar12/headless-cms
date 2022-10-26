import { isAlreadyAuth } from "../utils/auth";
import { NextPage } from "next";
import { useState } from "react";
import api from "../utils/api";
import { setCookie } from "nookies";
import Router from "next/router";

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("submit");
      const res = await api.auth.auth("password", { username, password });
      console.log(res);
      setCookie(null, "accessToken", res.accessToken);
      setCookie(null, "refreshToken", res.refreshToken);
      Router.push("/");
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export const getServerSideProps = isAlreadyAuth();

export default LoginPage;
