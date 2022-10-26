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

export const checkAuth = async (refreshToken: string, ctx?: ICtx) => {
  const cookie = nookies.get(ctx);
  try {
    const checkAuth = await api.auth.auth(
      "refresh_token",
      undefined,
      cookie.refreshToken
    );

    if (checkAuth) {
      nookies.set(ctx, "accessToken", checkAuth.accessToken);
      nookies.set(ctx, "refreshToken", checkAuth.refreshToken);
      return true;
    }
    nookies.destroy(ctx, "accessToken");
    nookies.destroy(ctx, "refreshToken");
    return false;
  } catch (e: any) {
    nookies.destroy(ctx, "accessToken");
    nookies.destroy(ctx, "refreshToken");
    return false;
  }
};

const isAuth = async (ctx: ICtx) => {
  try {
    const cookies = nookies.get(ctx);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    if (!accessToken && !refreshToken) return false;
    const IsAuth = await checkAuth(refreshToken as string, ctx);
    return IsAuth;
  } catch (e) {
    return false;
  }
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
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
    const isUserAuth = await isAuth(ctx);
    const currPath = ctx.resolvedUrl;
    if (isUserAuth && ctx.resolvedUrl === currPath)
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
