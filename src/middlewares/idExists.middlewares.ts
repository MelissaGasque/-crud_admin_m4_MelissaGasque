import { NextFunction, Request, Response } from "express"
import { client } from "../database"
import { AppError } from "../../errors"

export const validateIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, courseId } = req.params

    const userQuery = await client.query(
      'SELECT * FROM "users" WHERE "id" = $1',
      [userId]
    );

    if (userQuery.rowCount === 0) {
      throw new AppError("User/course not found", 404)
    }

    const courseQuery = await client.query(
      'SELECT * FROM "courses" WHERE "id" = $1',
      [courseId]
    );

    if (courseQuery.rowCount === 0) {
      throw new AppError("User/course not found", 404)
    }

    res.locals = {...res.locals, foundUser: userQuery.rows[0], foundCourse: courseQuery.rows[0]}

  return next()
 
}
