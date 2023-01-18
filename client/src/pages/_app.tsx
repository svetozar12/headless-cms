// src/pages/_app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppType } from "next/app";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { api } from "../utils/api";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

export const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ClientOnly children={<Navbar />} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
