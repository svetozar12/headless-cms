import { NextPageContext } from "next";
import Router from "next/router";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { HOME, LOGIN } from "../constants/routes";
import api from "./api";

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
      return true;
    }
    logout(cookie);
    return false;
  } catch (e: any) {
    logout(cookie);
    return false;
  }
};

const isAuth = async (ctx: ICtx) => {
  try {
    const cookies = parseCookies(ctx);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    if (!accessToken && !refreshToken) return false;
    const IsAuth = await checkAuth(refreshToken as string, ctx);
    return IsAuth;
  } catch (e) {
    return false;
  }
};

export const logout = (cookie: Record<string, any>) => {
  for (const key in cookie) destroyCookie(null, key);
  Router.push(LOGIN);
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);

  const currPath = ctx.resolvedUrl;
  const cookies = parseCookies(ctx);
  if (!isUserAuth) return redirectTo(LOGIN, ctx, currPath);
  if (getServerSideProps) {
    const gssp = await getServerSideProps(ctx);
    return {
      props: {
        cookie: { cookies } ?? "",
        ...gssp.props,
      },
    };
  }
  return {
    props: {
      cookie: { cookies } ?? "",
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
