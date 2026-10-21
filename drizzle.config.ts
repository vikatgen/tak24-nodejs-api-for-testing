import {defineConfig} from "drizzle-kit";
import {env} from "./src/config/env.js";

export default defineConfig({
    dialect: "postgresql",
    casing: "snake_case",
    schema: "./src/db/schema",
    out: "./migrations",
    dbCredentials: {
        url: env!.DATABASE_URL,
    },
    migrations: {
        prefix: "timestamp"
    }
});

