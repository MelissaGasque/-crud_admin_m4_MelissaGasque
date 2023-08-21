import { z } from "zod"

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).nonempty(),
    email: z.string().email().max(50).nonempty(),
    password: z.string().max(120).nonempty(),
    admin: z.boolean().default(false)
})

export const userCreate = userSchema.omit({id:true})
export const userCreateNoAdmin = userSchema.omit({id:true, admin:true})
export const userWithoutPassword = userSchema.omit({password:true})
