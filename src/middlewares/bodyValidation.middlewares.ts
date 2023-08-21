import { NextFunction, Request, Response } from "express"
import { z } from "zod"

//Body valido ao adicionar
export const bodyValidated = (schema: z.ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction): void =>{
    req.body = schema.parse(req.body)
    return next()
}