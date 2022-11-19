import { NextPage } from "next";
import { withAuthSync } from "../../utils/auth";

const DashBoardPage: NextPage = () => <div>dashboard</div>;

export const getServerSideProps = withAuthSync();

export default DashBoardPage;
