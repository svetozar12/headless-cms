import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import ContentList from "../../../components/ContentList";
import { redirectTo } from "../../../utils/redirect";

const ContentPage: NextPage = () => {
  return <ContentList />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (!session) {
    return redirectTo("/");
  }
  return {
    props: {},
  };
};

export default ContentPage;
