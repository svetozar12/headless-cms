import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import ContentList from "../../../components/ContentModelList";
import { redirectTo } from "../../../utils/redirect";

const ContentModelsPage: NextPage = () => <ContentList />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return redirectTo("/");
  }
  return {
    props: {},
  };
};

export default ContentModelsPage;
