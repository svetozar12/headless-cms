import { NextPage } from "next";
import { withAuthSync } from "../../utils/auth";

const ContentPage: NextPage = () => <div>content</div>;

export const getServerSideProps = withAuthSync();

export default ContentPage;
