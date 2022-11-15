import useSession from "../../hooks/useSession";
import { User } from "@headless-cms/server";

const HomePage: React.FC = () => {
  const { data, isLoading, error } = useSession();

  if (isLoading) return <>...loading</>;
  if (error) return <>{JSON.stringify(error)}</>;

  const { id, username } = data as User;
  return (
    <div>
      <h1>Welcome {username}</h1>
    </div>
  );
}

export default HomePage
