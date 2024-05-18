
import { IUserRepository } from "../../interface/repository/IuserRepository";
import INodemailer from "../../interface/services/Inodemailer";
import {IResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";



export const sendForgetPassOtp =  async(
    userRepository:IUserRepository,
    nodeMailer:INodemailer,
    email:string,
    username:string,
):Promise<IResponse>=>{
    try{

        console.log('the username is:',username)
        console.log('the email is:',email)

            const user = await userRepository.findUser(email)

            if(user){

                const verify = await nodeMailer.sendEmailVerification(email,username)

                return {
                    status: 200,
                    success: true,
                    message: verify
                }

            }
            throw ErrorResponse.badRequest("User not exist");




    }catch(error){
        console.log(error)
        throw error
    }
}