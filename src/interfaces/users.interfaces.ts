import { QueryResult } from "pg"
import { z } from "zod"
import { userCreate, userCreateNoAdmin, userSchema, userWithoutPassword } from "../schemas/user.schemas"

type User = z.infer<typeof userSchema>

type UserResult = QueryResult<User>
type UserCreate = z.infer<typeof  userCreate>
type UserCreateNoAdmin = z.infer<typeof userCreateNoAdmin>
type UserWithoutPassword = z.infer<typeof userWithoutPassword>


export { User, UserResult, UserCreate, UserCreateNoAdmin, UserWithoutPassword }