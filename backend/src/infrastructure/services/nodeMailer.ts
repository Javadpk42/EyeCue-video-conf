import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/Inodemailer";

class NodeMailer implements INodemailer {
    private otps: Map<string, string> = new Map();
 
 
    generateOTP(): string {

        console.log('entered otp')
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        console.log('the new otp is :',otp)
        return otp;
    }

    //to send the mail

    async sendEmailVerification(
        email: string,
        username: string
    ): Promise<string> {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.SMTP_PASS,
                },
            });

            if (this.otps) {
                this.otps.clear();
            }

            const otp = this.generateOTP();
            this.otps.set(email, otp);

            const mailOptions = {
                from: "csa20218042@gmail.com",
                to: email,
                subject: "Email Verification",
                html: `<div style="width: 90%; margin: 20px auto; max-width: 600px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center;">
                <h2>EyeCue</h2>
                <p>Hi,</p>
                <p>Enter this code in the next 10 minutes to sign up:</p>
                <div style="background-color: #0B5CFF; color: #fff; padding: 20px; border-radius: 5px; margin-bottom: 40px;">
                    <h1 style="font-size: 36px; margin: 0;">${otp}</h1>
                </div>
                <p>If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
            </div>
             `,
            };

            await transporter.sendMail(mailOptions);
            return "Hey please check your email";
        } catch (error) {
            throw new Error(
                `Unable to send email verification email to ${email}: ${error}`
            );
        }
    }

    //verify mail
    async verifyEmail(enteredOtp: string, email: string): Promise<boolean> {
        try {

            const expectedOTP = this.otps.get(email);
            console.log('the expected otp is :',expectedOTP)
            console.log('the Entered otp is :',enteredOtp)
            if (expectedOTP === enteredOtp) {
                this.otps.delete(email);
                return true;
            } else {
                return false;
            }

        } catch (error) {

            throw new Error('Worng otp')

        }
    }
}

export default NodeMailer;