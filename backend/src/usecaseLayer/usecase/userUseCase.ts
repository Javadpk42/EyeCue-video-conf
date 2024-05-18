import { IUserRepository } from "../interface/repository/IuserRepository";
import { createUser } from "./user/createUser";
import { verifyEmail } from "./user/sendMail";
import { emailVerification } from "./user/emailVerification";
import { googleAuth } from "./user/googleAuth";
import { loginUser } from "./user/loginUser";
import Ijwt from "../interface/services/Ijwt";
import IHashPassword from "../interface/services/IHashPassword";
import INodemailer from "../interface/services/Inodemailer";
import { forgotPassword } from "./user/forgotPassword";
import { sendForgetPassOtp } from "./user/sendForgetPassOtp";

export class UserUseCase {

    private readonly userRepository: IUserRepository
    private readonly jwt: Ijwt;
    private readonly bycrypt: IHashPassword
    private readonly nodemailer: INodemailer

    constructor(
        userRepository: IUserRepository,
        jwt: Ijwt,
        bycrypt: IHashPassword,
        nodemailer: INodemailer
    ) {
        this.userRepository = userRepository
        this.jwt = jwt
        this.bycrypt = bycrypt
        this.nodemailer = nodemailer
    }


    //to create a user
    async createUser({
        username,
        email,
        password,
    }: {
        username: string;
        email: string;
        password: string;
    }) {
        return createUser(
            this.userRepository,
            this.jwt,
            this.bycrypt,
            username,
            email,
            password
        )
    }
    async googleAuth({
        username,
        email,
        password

    }: {
        username: string;
        email: string;
        password: string;
    }) {

        
        return googleAuth(
            this.userRepository,
            this.bycrypt,
            this.jwt,
            username,
            email,
            password
    )
    }
    async loginUser({ email, password }: { email: string, password: string }) {
        return loginUser(this.userRepository, this.bycrypt, this.jwt, email, password)
    }



    async verifyEmail({ email, username }: { email: string; username: string }) {
        return verifyEmail(this.userRepository, this.nodemailer, email, username)
    }

    async emailVerification({ otp, email }: { otp: string; email: string }) {

        return emailVerification(this.nodemailer, otp, email)

    }
    async forgotPassword({email,password}:{email:string,password:string}){
        return forgotPassword(
            this.userRepository,
            this.bycrypt,
            this.jwt,
            email,
            password
        )
    }

    
    async sendForgetPassOtp({ email, username }: { email: string; username: string }) {
        return sendForgetPassOtp(this.userRepository, this.nodemailer, email, username)
    }


  



}