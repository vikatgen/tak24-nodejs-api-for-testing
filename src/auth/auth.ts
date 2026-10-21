import {betterAuth} from "better-auth";
import {env} from "../config/env.js";
import {drizzleAdapter} from "@better-auth/drizzle-adapter";
import {db} from "../db/index.js";
import * as schema from "../db/schema/auth.schema.js"

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    advanced: {
        database: {
            generateId: "uuid"
        }
    },
    user: {
        additionalFields: {
            role: {
                type: ["admin", "organizer", "attendee", "security"],
                required: true,
                defaultValue: "attendee",
                input: false
            }
        }
    }
});