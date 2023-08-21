import { z } from "zod"

export const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15).nonempty(),
    description: z.string().nonempty(), 
})

export const courseCreate = courseSchema.omit({id:true})

