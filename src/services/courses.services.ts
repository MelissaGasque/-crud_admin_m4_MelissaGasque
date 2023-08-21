import format from "pg-format"
import { Course, CourseCreate } from "../interfaces/courses.interface"
import { QueryResult } from "pg"
import { client } from "../database"
import { AppError } from "../../errors"

export const registerNewCourse = async(payload: CourseCreate ):Promise<Course> => {
    
    const queryCreate: string = format(`
        INSERT INTO "courses" (%I)
        VALUES (%L)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
    )
    const queryResult: QueryResult = await client.query(queryCreate)
    return queryResult.rows[0]
}

export const showAllCourses = async(): Promise<Course[]> =>{
    const queryRead: string = `
        SELECT * FROM "courses"
    `

    const queryResult: QueryResult = await client.query(queryRead)
    return queryResult.rows;
}

export const registerUserInCourse = async(courseId: string, userId: string):Promise<void> => {
    const queryConectarTabelas: string = `
        INSERT INTO "userCourses"
        ("courseId", "userId")
        VALUES ($1, $2)
        RETURNING*; 
        `
        await client.query(queryConectarTabelas, [courseId, userId])
}

export const deleteCourse = async(courseId: string, userId: string):Promise<void> => {
    //soft delete
    const queryString: string = `
    UPDATE "userCourses"
    SET "active" = false
    WHERE "courseId" = $1
    AND "userId" = $2;
  `

  await client.query(queryString, [courseId, userId])
}

export const readRegisteredUsers = async (courseId: string) => {
    const allRegisteredUsers: string =`
    SELECT
        "uc"."userId",
        "u"."name" AS "userName",
        "uc"."courseId",
        "c"."name" AS  "courseName",
        "c"."description" AS "courseDescription",
        "uc"."active" AS "userActiveInCourse"
    FROM users "u"
    JOIN "userCourses" "uc" ON "u".id = "uc"."userId"
    JOIN "courses" "c" ON "c".id = "uc"."courseId"
    WHERE "c"."id" = $1;   
    `;

    const queryResult: QueryResult = await client.query(allRegisteredUsers, [courseId])

    if (!queryResult.rowCount) {
        throw new AppError("No user found", 404)
    }

    return queryResult.rows
}