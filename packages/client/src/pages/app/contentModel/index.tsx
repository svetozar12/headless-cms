import type { NextPage } from "next";
import ContentList from "../../../components/ContentModelList";
import { withAuthSync } from "../../../utils/auth";

const ContentModelsPage: NextPage = () => <ContentList />;

export const getServerSideProps = withAuthSync();

export default ContentModelsPage;
