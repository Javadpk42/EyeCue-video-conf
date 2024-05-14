import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";

export const emailVerification = async (
    nodemailer: INodemailer,
    otp: string,
    email: string
): Promise<IResponse> => {

    try {

        console.log(email,',',otp)
        const verify = await nodemailer.verifyEmail(otp, email)
        console.log(verify)
        if (verify) {
            return {
                status: 200,
                success: true,
                message: "Succesfully logged In",
            };
        } else {
            return {
                status: 401,
                success: false,
                message: "Otp Verification failed please try later",
            };
        }

    } catch (error) {
        throw error

    }

}