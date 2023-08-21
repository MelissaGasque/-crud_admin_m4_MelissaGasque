import { Request, Response } from 'express'
import { allCoursesOfUser, createUser, showAllUsers } from './../services/users.services'
import { UserWithoutPassword } from '../interfaces/users.interfaces'

//Cadastrar usuario
export const createNewUser = async(req:Request, res:Response): Promise<Response> => {
    const newUser: UserWithoutPassword = await createUser(req.body)
    return res.status(201).json(newUser)
};

// //Listar todos os usuários
export const readUsers = async(req:Request, res:Response): Promise<Response> => {
    const users = await showAllUsers()
    return res.status(200).json(users)
};

// //Listar todos os cursos
export const readCourses = async(req:Request, res:Response): Promise<Response> => {
    const registeredUsers = await allCoursesOfUser (req.params.id);
    return res.status(200).json(registeredUsers)
};