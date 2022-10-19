import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { getHealth } from "../types/api";

const Home: NextPage = () => {
  const { data } = useQuery<getHealth>(["getHealth"], api.health.get);

  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Server status</h1>
      <h2>{data.message || "down"}</h2>
    </div>
  );
};

export default Home;
