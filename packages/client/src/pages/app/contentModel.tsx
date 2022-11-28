import type { NextPage } from "next";
import ContentModels from "../../components/pagesLayout/ContentModel/ContentModels";
import { isAlreadyAuth, withAuthSync } from "../../utils/auth";

const ContentModelsPage: NextPage = () => <ContentModels />;

export const getServerSideProps = withAuthSync();

export default ContentModelsPage;
