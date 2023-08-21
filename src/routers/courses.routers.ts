import { Router } from "express"
import { addUserCourses, createCourses, readAllCoursesUsers, readCourses, softDelete } from "../controllers/courses.controllers"
import { validateToken } from "../middlewares/tokenValid.middlewares"
import { bodyValidated } from "../middlewares/bodyValidation.middlewares"
import { courseCreate } from "../schemas/course.schema"
import { verifyUserPermission } from "../middlewares/verifyUserPermission.middlewares"
import { validateIdExists } from "../middlewares/idExists.middlewares"


export const coursesRouter: Router = Router();


coursesRouter.post("", bodyValidated(courseCreate), validateToken, verifyUserPermission, createCourses)

coursesRouter.get("", readCourses)

coursesRouter.post("/:courseId/users/:userId", validateIdExists, validateToken, verifyUserPermission, addUserCourses)

coursesRouter.delete("/:courseId/users/:userId", validateIdExists, validateToken, verifyUserPermission, softDelete)

coursesRouter.get("/:id/users",  validateToken, verifyUserPermission, readAllCoursesUsers)   