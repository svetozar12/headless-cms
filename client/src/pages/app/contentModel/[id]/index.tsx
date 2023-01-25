import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import ContentModel from "../../../../components/ContentModel/ContentModel";
import { redirectTo } from "../../../../utils/redirect";

const ContentModelPage: NextPage = () => <ContentModel />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return redirectTo("/");
  }
  return {
    props: {},
  };
};

export default ContentModelPage;
