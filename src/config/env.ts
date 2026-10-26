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

    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    GOOGLE_CLIENT_ID: z.string().min(12),
    GOOGLE_CLIENT_SECRET: z.string().min(12),
    GITHUB_CLIENT_ID: z.string().min(12),
    GITHUB_CLIENT_SECRET: z.string().min(12),
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