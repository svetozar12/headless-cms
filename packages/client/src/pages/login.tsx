import { isAlreadyAuth } from "../utils/auth";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return <div>There will be the login</div>;
};
export const getServerSideProps = isAlreadyAuth();

export default LoginPage;
