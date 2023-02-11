import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Content from "../../../../components/Content";
import { redirectTo } from "../../../../utils/redirect";

const ContentPage: NextPage = () => <Content />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return redirectTo("/");
  }
  return {
    props: {},
  };
};

export default ContentPage;
