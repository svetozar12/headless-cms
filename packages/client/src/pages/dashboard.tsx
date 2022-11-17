import { NextPage } from "next";
import { isAlreadyAuth } from "../utils/auth";

const DashBoardPage: NextPage = () => <div>dashboard</div>;

export const getServerSideProps = isAlreadyAuth();

export default DashBoardPage;
