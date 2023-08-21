import { NextFunction, Request, Response } from "express"
import { AppError } from './../../errors'

export const ensureTokenOwner = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { decoded } = res.locals

  if (decoded.sub !== req.params.id) {
    throw new AppError("Insufficient permission", 403)
  }
  return next();
};