// src/utils/api.ts
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import { env } from "../env/env";

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

const api = {
  health: {
    get: () => fetch(`${apiHost}/health`).then((res) => res.json()),
  },
};

export default api;
