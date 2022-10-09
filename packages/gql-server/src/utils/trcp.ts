import { createTRPCProxyClient, httpLink } from '@trpc/client';
import type { AppRouter } from '@headless-cms/server';
import * as fetch from 'node-fetch';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: 'http://localhost:5000/trpc',
      fetch: fetch as any,
    }),
  ],
});
