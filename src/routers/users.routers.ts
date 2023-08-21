import { Router } from "express"
import { createNewUser, readCourses, readUsers } from "../controllers/users.controllers"
import { bodyValidated } from "../middlewares/bodyValidation.middlewares"
import { userCreate } from "../schemas/user.schemas"
import { validateToken } from "../middlewares/tokenValid.middlewares"
import { emailExist } from "../middlewares/UserEmailExist.middlewares"
import { verifyUserPermission} from "../middlewares/verifyUserPermission.middlewares"



export const userRouter: Router = Router();

userRouter.post("", emailExist, bodyValidated(userCreate), createNewUser)
userRouter.get("", validateToken, verifyUserPermission, readUsers) 
userRouter.get("/:id/courses",  validateToken, verifyUserPermission, readCourses)