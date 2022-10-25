import nookies from "nookies";
import api from "./api";
import { NextPageContext } from "next";
import { HOME, LOGIN } from "../constants/routes";

const redirectTo = (
  redirectURL: string,
  ctx: NextPageContext,
  prevPath?: string
) => ({
  redirect: {
    destination: `${
      // prevPath ? `${redirectURL}?callback=${prevPath}` : redirectURL
      redirectURL
    }`,
    permanent: false,
  },
});

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const isAuth = async (ctx: ICtx) => {
  try {
    const cookies = nookies.get(ctx);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    if (!accessToken) {
      if (!refreshToken) {
        const checkAuth = await api.auth.auth(
          "refresh_token",
          undefined,
          refreshToken
        );

        if (checkAuth) {
          nookies.set(ctx, "accessToken", checkAuth.accessToken);
          nookies.set(ctx, "refreshToken", checkAuth.refreshToken);
          return true;
        }
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = true;
  console.log(isUserAuth);
  const currPath = ctx.resolvedUrl;

  if (!isUserAuth) return redirectTo(LOGIN, ctx, currPath);
  if (getServerSideProps) {
    const gssp = await getServerSideProps(ctx);
    return {
      props: {
        cookie: ctx.req?.headers.cookie ?? "",
        ...gssp.props,
      },
    };
  }
  return {
    props: {
      cookie: ctx.req?.headers.cookie ?? "",
    },
  };
};

export const isAlreadyAuth =
  (getServerSideProps?: any) => async (ctx: ICtx) => {
    const isUserAuth = true;
    const currPath = ctx.resolvedUrl;

    if (isUserAuth && ctx.resolvedUrl !== currPath)
      return redirectTo(HOME, ctx, currPath);
    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);
      return {
        props: {
          cookie: ctx.req?.headers.cookie ?? "",
          ...gssp.props,
        },
      };
    }
    return {
      props: {
        cookie: ctx.req?.headers.cookie ?? "",
      },
    };
  };
