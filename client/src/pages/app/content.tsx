import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useCookie } from "next-cookie";
import { redirectTo } from "../../utils/redirect";

const ContentPage: NextPage = () => <div>hi</div>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession();
  console.log(session, "zvesden");

  if (!session) {
    return redirectTo("/");
  }
  return {
    props: {},
  };
};

export default ContentPage;
