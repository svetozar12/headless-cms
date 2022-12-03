import type { NextPage } from "next";
import ContentList from "../../../components/ContentList/ContentList";
import { withAuthSync } from "../../../utils/auth";

const ContentModelsPage: NextPage = () => <ContentList />;

export const getServerSideProps = withAuthSync();

export default ContentModelsPage;
