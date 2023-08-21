import { z } from "zod"
import { courseCreate, courseSchema } from "../schemas/course.schema"

type Course = z.infer<typeof courseSchema>

type CourseCreate = z.infer<typeof courseCreate>

export { Course, CourseCreate }