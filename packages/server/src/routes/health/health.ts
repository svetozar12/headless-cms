import { z } from "zod";
import { t } from "../..";
export const healthRouter = t.router({
  getHealth: t.procedure.input(z.string()).query((req) => {
    return req.input;
  }),
});

export default healthRouter;
