import { NextPage } from "next";
import { isAlreadyAuth } from "../utils/auth";

const ProfilePage: NextPage = () => <div>profile</div>;

export const getServerSideProps = isAlreadyAuth();

export default ProfilePage;
