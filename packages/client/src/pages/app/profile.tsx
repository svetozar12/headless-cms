import { NextPage } from "next";
import Profile from "../../components/Profile";
import { withAuthSync } from "../../utils/auth";

const ProfilePage: NextPage = () => <Profile />;

export const getServerSideProps = withAuthSync();

export default ProfilePage;
