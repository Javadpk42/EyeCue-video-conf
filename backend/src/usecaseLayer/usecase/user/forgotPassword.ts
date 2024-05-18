

import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import IHashPassword from "../../interface/services/IHashPassword";
import { IResponse } from "../../interface/services/Iresponse";



export const forgotPassword = async(
    userRepository:IUserRepository,
    bycrypt:IHashPassword,
    jwt:Ijwt,
    email:string,
    password:string,
):Promise<IResponse>=>{
    try {

        const hashedPassword = await bycrypt.createHash(password)

        const newPassword = {
            email,
            password:hashedPassword
        }

        const forgotUser = await userRepository.forgotPassword(newPassword)

        const token = jwt.createJWT(forgotUser._id as string,forgotUser.email,"user",forgotUser.username)
        return {
            status: 200,
            success: true,
            message: `password changed successfully`,
            token : token,
            data : forgotUser
          };
        
    } catch (error) {
        console.log(error)

        throw error
        
    }
}