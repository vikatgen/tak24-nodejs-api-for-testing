import {Pool} from 'pg';
import {env} from "../config/env.js";
import {drizzle} from 'drizzle-orm/node-postgres';

export const pool = new Pool({
    connectionString: env.DATABASE_URL
});

export const db = drizzle({
    client: pool,
    casing: "snake_case"
});

export const Database = typeof db;