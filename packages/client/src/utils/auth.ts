import { NextPageContext } from "next";
import { useCookie, Cookie } from "next-cookie";
import { CONTENT_MODELS, LOGIN, LOGOUT } from "../constants/routes";
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
  const cookie = useCookie(ctx);
  try {
    const checkAuth = await api.auth.auth(
      "refresh_token",
      undefined,
      cookie.get("refreshToken")
    );
    console.log(checkAuth, "ti mrusono negro");

    if (checkAuth) {
      return checkAuth;
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
    const cookie = useCookie(ctx);
    const refreshToken = cookie.get("refreshToken");
    console.log(!!(await checkAuth(refreshToken as string, ctx)));

    return !!(await checkAuth(refreshToken as string, ctx));
  } catch (e) {
    return false;
  }
};

export const logout = async (cookie: Cookie) => {
  cookie.remove("accessToken");
  cookie.remove("refreshToken");
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);

  const currPath = ctx.resolvedUrl;
  if (!isUserAuth) return redirectTo(LOGOUT, ctx, currPath);
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
    const isUserAuth = await isAuth(ctx);
    const currPath = ctx.resolvedUrl;
    if (isUserAuth && ctx.resolvedUrl === currPath)
      return redirectTo(CONTENT_MODELS, ctx, currPath);
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
