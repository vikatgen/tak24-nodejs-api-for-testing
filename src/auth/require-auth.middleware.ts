import {RequestHandler} from "express";
import {auth} from "./auth.js";
import { fromNodeHeaders } from "better-auth/node";
import {AuthUser} from "./express.js";

export const requireAuth: RequestHandler = async (request, response, next) => {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(request.headers) });

    if (!session) {
        response.status(401).json({ error: "Pole sisse logitud"});
        return;
    }

    request.user = session.user;
    next();
};

export const requireRole = (...roles: NonNullable<AuthUser["role"]>[]): RequestHandler => (request,response, next) => {
    const role = request.user?.role;

    if (role === "admin" || (role && roles.includes(role))) {
        next();
        return;
    }

    response.status(401).json({ error: "Puuduvad vajalikud õigused"});
};