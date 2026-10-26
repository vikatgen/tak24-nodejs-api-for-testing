import z  from "zod";
import { ROLES } from "../roles.js";
import {AuthUser} from "../express.js";

export const meResponseSchema = z.strictObject({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    image: z.string().nullable(),
    role: z.enum(ROLES).nullable()
});

export type MeResponseDTO = z.infer<typeof meResponseSchema>;

export function toMeResponse(user: AuthUser): MeResponseDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image ?? null,
        role: user.role ?? null
    }
}
