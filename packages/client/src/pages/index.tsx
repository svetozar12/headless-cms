import type { NextPage } from "next";
import { User } from "@headless-cms/server";
import { withAuthSync } from "../utils/auth";
import useSession from "../hooks/useSession";
import HomePage from "../components/pagesLayout/HomePage";

const Home: NextPage = () => <HomePage />;

export const getServerSideProps = withAuthSync();

export default Home;
