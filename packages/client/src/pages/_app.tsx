// src/pages/_app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppType } from "next/app";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientOnly>
        <Navbar />
      </ClientOnly>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
