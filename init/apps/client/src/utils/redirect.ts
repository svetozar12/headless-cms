import { GetServerSidePropsContext } from "next";

export const redirectTo = (redirectURL: string) => ({
  redirect: {
    destination: redirectURL,
    permanent: false,
  },
});
