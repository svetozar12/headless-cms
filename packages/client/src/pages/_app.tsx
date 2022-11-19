// src/pages/_app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppType } from "next/app";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
