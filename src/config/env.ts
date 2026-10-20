import z from 'zod';

const envSchema = z.object({
    NODE_ENV: z
        .enum(["production", "development", "test"])
        .default("development"),

    PORT: z
        .coerce
        .number()
        .int()
        .min(1000)
        .max(65535)
        .default(3000),

    DATABASE_URL: z
        .string()
        .url()
});

const parseEnv = () => {
    const result = envSchema.safeParse(process.env);

    if(!result.success) {
        console.error(`Invalid environment variable: ${z.prettifyError(result.error)}`);
        process.exit(1);
    }

    return result.data;
};

export const env = parseEnv();