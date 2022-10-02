import type { NextPage } from "next";

const Home: NextPage = () => {
  const loginWithDiscord = () => {
    window.open("http://localhost:5000/auth/discord", "_self");
  };

  return (
    <>
      <button onClick={() => loginWithDiscord()}>Login with discord</button>
    </>
  );
};

export default Home;
