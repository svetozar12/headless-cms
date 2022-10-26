import type { NextPage } from "next";
import { User } from "@headless-cms/server";
import { withAuthSync } from "../utils/auth";
import useSession from "../hooks/useSession";

const Home: NextPage = () => {
  const { data, isLoading, error, setToken } = useSession();

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
