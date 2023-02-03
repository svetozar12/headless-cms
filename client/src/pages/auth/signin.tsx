import { NextPage, GetServerSideProps } from "next";
import { getProviders, getSession } from "next-auth/react";
import { useCookie } from "next-cookie";
import SignIn from "../../components/SignIn";
import { redirectTo } from "../../utils/redirect";

type ProviderOptions = {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
};

type Props = {
  providers: {
    github: ProviderOptions;
  };
};

const SignInPage: NextPage<Props> = ({ providers }) => (
  <SignIn providers={providers} />
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();
  const session = await getSession();
  const cookies = useCookie(ctx);
  if (session) {
    return redirectTo(cookies.get("next-auth.callback-url") || "/app/content");
  }
  return {
    props: { providers },
  };
};

export default SignInPage;
