import z from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_PROTOCOL: z.string().default("http://"),
  NEXT_PUBLIC_API_HOST: z.string().default("localhost"),
  NEXT_PUBLIC_API_PORT: z.string().default("5000"),
});

const _schema = schema.safeParse(process.env);

const env = _schema.success ? _schema.data : schema.parse({});

export { env };
