import { NextPage } from "next";
import Login from "../components/pagesLayout/Login/Login";
import { isAlreadyAuth } from "../utils/auth";

const LoginPage: NextPage = () => <Login />;

export const getServerSideProps = isAlreadyAuth();

export default LoginPage;
