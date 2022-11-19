import type { NextPage } from "next";
import HomePage from "../../components/pagesLayout/HomePage";
import { isAlreadyAuth, withAuthSync } from "../../utils/auth";

const Home: NextPage = () => <HomePage />;

export const getServerSideProps = withAuthSync();

export default Home;
