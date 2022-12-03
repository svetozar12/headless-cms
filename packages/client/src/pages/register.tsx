import { isAlreadyAuth } from "../utils/auth";
import { NextPage } from "next";
import Register from "../components/Register/Register";

const RegisterPage: NextPage = () => <Register />;
export const getServerSideProps = isAlreadyAuth();

export default RegisterPage;
