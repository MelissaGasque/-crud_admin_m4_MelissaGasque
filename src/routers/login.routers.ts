import { Router } from "express" 
import { loginController } from "../controllers/login.controller"
import { bodyValidated } from "../middlewares/bodyValidation.middlewares"
import { loginschema } from "../schemas/login.schema"

export const loginRouter: Router = Router()

loginRouter.post("", bodyValidated(loginschema), loginController) 