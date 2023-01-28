import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const fieldTypeEnums = [
  {
    title: "text",
    type: "string",
  },
  {
    title: "true/false",
    type: "boolean",
  },
  {
    title: "number",
    type: "number",
  },
  {
    title: "Date and time",
    type: "date",
  },
  {
    title: "JSON object",
    type: "object",
  },
];

export const fieldTypeEnumsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return fieldTypeEnums;
  }),
});
