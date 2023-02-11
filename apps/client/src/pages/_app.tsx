// src/pages/_app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppType } from "next/app";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { api } from "../utils/api";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  NProgress.configure({ showSpinner: false, minimum: 0.5 });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <SessionProvider session={pageProps.session}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <QueryClientProvider client={queryClient}>
          <ClientOnly>
            <Navbar />
          </ClientOnly>
          <Component {...pageProps} />
        </QueryClientProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
