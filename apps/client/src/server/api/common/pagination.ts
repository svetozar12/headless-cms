import { z } from "zod";

export const paginationSchema = z
  .object({
    offSet: z.number().default(1).optional(),
    limit: z.number().default(10).optional(),
  })
  .optional()
  .default({ limit: 10, offSet: 1 });
