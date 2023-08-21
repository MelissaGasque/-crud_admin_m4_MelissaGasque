import { userSchema } from "./user.schemas"

export const loginschema = userSchema.pick({
    email: true,
    password: true,
})