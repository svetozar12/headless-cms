import { NextPage, GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import SignIn from "../../components/SignIn";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignInPage;
