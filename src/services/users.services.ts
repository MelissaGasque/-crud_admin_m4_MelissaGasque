import format  from 'pg-format'
import { UserResult, UserCreate, UserCreateNoAdmin, UserWithoutPassword} from "../interfaces/users.interfaces"
import { client } from "../database"
import { hash } from "bcryptjs"
import { userWithoutPassword } from '../schemas/user.schemas'
import { QueryResult } from 'pg'
import { AppError } from '../../errors'

//Cadastrar um novo usuário
export const createUser = async(payload: UserCreate | UserCreateNoAdmin):Promise<UserWithoutPassword> => {

    payload.password = await hash(payload.password, 10)

    const queryCreate: string = format(`
        INSERT INTO "users" (%I)
        VALUES (%L)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
    );

    const queryResult: UserResult = await client.query(queryCreate)
    return userWithoutPassword.parse(queryResult.rows[0])
   
};

//Listar todos os usuários da aplicação
export const showAllUsers = async(): Promise<UserWithoutPassword[]> =>{
    const queryRead: string = `
        SELECT * FROM "users"
    `

    const queryResult: UserResult = await client.query(queryRead)
    return queryResult.rows.map(row => userWithoutPassword.parse(row))
}

export const allCoursesOfUser = async(userId: string) => {
    const allRegisteredCourse: string = `
    SELECT
        "uc"."courseId",
        "c"."name" AS "courseName",
        "c"."description" AS "courseDescription",
        "uc"."active" AS  "userActiveInCourse",
        "uc"."userId",
        "u"."name" AS  "userName"
    FROM users "u"
    JOIN "userCourses" "uc" ON "u".id = "uc"."userId"
    JOIN "courses" "c" ON "c".id = "uc"."courseId"
    WHERE "u"."id" = $1;     
    `
    const queryResult: QueryResult = await client.query(allRegisteredCourse, [userId])

    if (!queryResult.rowCount) {
        throw new AppError("No course found", 404)
    }

    return queryResult.rows

}