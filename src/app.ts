import "express-async-errors"
import express, { Application, json } from 'express'
import { handleError } from './middlewares/handleError.middlewares'
import { userRouter } from "./routers/users.routers"
import { loginRouter } from "./routers/login.routers"
import { coursesRouter } from "./routers/courses.routers"

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/login", loginRouter)
app.use("/courses", coursesRouter)

app.use(handleError)

export default app
