import {Router} from "express";
import {requireAuth} from "./require-auth.middleware.js";
import {toMeResponse} from "./dto/me-response.dto.js";

export const router = Router();

router.get("/me", requireAuth ,(request, response) => {
    response.json(toMeResponse(request.user!));
})