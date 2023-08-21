import { compare } from "bcryptjs"
import { AppError } from "../../errors"
import { client } from "../database"
import { Loginschema } from "../interfaces/login.interface"
import { UserResult } from "../interfaces/users.interfaces"
import { sign } from "jsonwebtoken"

export const login = async(payload: Loginschema): Promise<string> => {

    const querylogin: string = `
        SELECT * FROM "users"
        WHERE email = $1
    `

    const queryResult: UserResult = await client.query(querylogin, [payload.email])
  

    if(!queryResult.rowCount){
        throw new AppError("Wrong email/password", 401)
    }
    
    const matchPassword: boolean = await compare(payload.password, queryResult.rows[0].password)
   
    if(!matchPassword){
        throw new AppError("Wrong email/password", 401)
    }
   
    // if(!queryResult.rows[0].active){
    //     throw new AppError("This developer is inactive, 401")
    // }
    
    
    const token: string = sign(
        { email: queryResult.rows[0].email, admin:queryResult.rows[0].admin },
        process.env.SECRET_KEY!,
       
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject: queryResult.rows[0].id.toString(),
           
        }
    )

    return token
}