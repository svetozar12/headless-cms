import { NextPage } from "next";
import Logout from "../components/Logout";
import { withAuthSync } from "../utils/auth";

const LogoutPage: NextPage = () => <Logout />;

export default LogoutPage;
