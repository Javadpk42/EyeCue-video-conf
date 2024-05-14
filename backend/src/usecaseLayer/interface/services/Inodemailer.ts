
interface INodemailer{
    generateOTP(email:string):string
    sendEmailVerification(email:string,username:string): Promise<string>
    verifyEmail(enteredOtp:string,email:string) :Promise<boolean>
}


export default INodemailer