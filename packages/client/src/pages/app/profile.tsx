import { NextPage } from "next";
import { isAlreadyAuth, withAuthSync } from "../../utils/auth";

const ProfilePage: NextPage = () => <div>profile</div>;

export const getServerSideProps = withAuthSync();

export default ProfilePage;
