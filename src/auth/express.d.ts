import type { auth } from "./auth.js";

export type AuthUser = typeof auth.$Infer.Session.user;

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}