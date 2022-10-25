import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { User } from "@headless-cms/server";
import { withAuthSync } from "../utils/auth";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<User>(["repoData"], () =>
    api.user.me.get(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ecJpZCI6MSwiaWF0IjoxNjY2NzI0ODQxLCJleHAiOjE2NjY3MjQ5MDF9.vTSWubAKoTpUgHrgSGge8w6IO1P_qxESwAerpznF-YY"
    )
  );
  if (isLoading) return <>...loading</>;
  if (error) return <>{JSON.stringify(error)}</>;
  const { id, username } = data as User;
  return (
    <div>
      <h1>Welcome {username}</h1>
    </div>
  );
};

export const getServerSideProps = withAuthSync();

export default Home;
