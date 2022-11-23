import { NextPage } from "next";
import Logout from "../components/pagesLayout/Logout";
import { withAuthSync } from "../utils/auth";

const LogoutPage: NextPage = () => <Logout />;

export const getServerSideProps = withAuthSync();

export default LogoutPage;
