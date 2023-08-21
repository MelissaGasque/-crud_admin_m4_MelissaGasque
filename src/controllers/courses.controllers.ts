import { Request, Response } from "express"
import { deleteCourse, readRegisteredUsers, registerNewCourse, registerUserInCourse, showAllCourses } from "../services/courses.services"

export const createCourses = async(req: Request, res: Response): Promise<Response> => {
    const newCourse = await registerNewCourse(req.body)
    return res.status(201).json(newCourse)
}

export const readCourses = async(req:Request, res:Response): Promise<Response> => {
    const users = await showAllCourses()
    return res.status(200).json(users)
}

export const addUserCourses = async(req:Request, res:Response): Promise<Response> => {
    const {courseId, userId} = req.params
    await registerUserInCourse(courseId, userId)
    return res.status(201).json({"message": "User successfully vinculed to course"})
}

export const softDelete = async(req:Request, res: Response): Promise<Response> => {
    const courseId = req.params.courseId
    const userId = req.params.userId
    await deleteCourse(courseId, userId)
    return res.status(204).json()
}

export const readAllCoursesUsers = async (req: Request, res: Response): Promise<Response> => {
    const registeredUsers = await readRegisteredUsers(req.params.id);
    return res.status(200).json(registeredUsers)
}