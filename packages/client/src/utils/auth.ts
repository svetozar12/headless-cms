import { NextPageContext } from "next";
import { useCookie, Cookie } from "next-cookie";
import { CONTENT_MODELS, LOGOUT } from "../constants/routes";
import api from "./api";

const redirectTo = (
  redirectURL: string
  // ctx: NextPageContext,
  // prevPath?: string
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

export const checkAuth = async (cookie: Cookie) => {
  const accessToken: string = cookie.get("accessToken");
  const refreshToken: string = cookie.get("refreshToken");

  if (!accessToken) {
    if (refreshToken) {
      try {
        const checkAuth = await api.auth.auth(
          "refresh_token",
          undefined,
          refreshToken
        );

        if (checkAuth) return checkAuth;

        return false;
      } catch (e: any) {
        return false;
      }
    }
    return false;
  }
  return true;
};

export const logout = async (cookie: Cookie) => {
  cookie.remove("accessToken");
  cookie.remove("refreshToken");
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const isUserAuth = await checkAuth(cookie);

  // const currPath = ctx.resolvedUrl;
  if (!isUserAuth) {
    logout(cookie);
    return redirectTo(LOGOUT);
  }
  if (getServerSideProps) {
    const gssp = await getServerSideProps(ctx);
    return {
      props: {
        ...gssp.props,
      },
    };
  }
  return {
    props: {},
  };
};

export const isAlreadyAuth =
  (getServerSideProps?: any) => async (ctx: ICtx) => {
    const cookie = useCookie(ctx);
    const isUserAuth = await checkAuth(cookie);
    const currPath = ctx.resolvedUrl;
    if (isUserAuth && ctx.resolvedUrl === currPath)
      return redirectTo(CONTENT_MODELS);
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
