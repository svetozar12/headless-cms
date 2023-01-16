import type { NextPage } from "next";
import ContentModel from "../../../../components/ContentModel/ContentModel";
import { withAuthSync } from "../../../../utils/auth";

const ContentModelPage: NextPage = () => <ContentModel />;

export const getServerSideProps = withAuthSync();

export default ContentModelPage;
