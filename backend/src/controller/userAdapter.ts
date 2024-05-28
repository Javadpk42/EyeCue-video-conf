import { Next, Req, Res } from '../infrastructure/types/expressTypes';
import { UserUseCase } from '../usecaseLayer/usecase/userUseCase';

export class UserAdapters {
    private readonly userusecases: UserUseCase;

    constructor(userusecases: UserUseCase) {
        this.userusecases = userusecases; // using dependency injection to call the userusecase
    }

    // @desc  Register new user 
    //route     POST api/user/singup
    async createUser(req: Req, res: Res, next: Next) {
        try {
            console.log('casfsf',req.body);
            
            const newUser = await this.userusecases.createUser(req.body);
            console.log(newUser);
            res.status(newUser.status).json({
                success: newUser.success,
                message: newUser.message,
                user: newUser.data
            });
        } catch (error) {
            next(error);
        }
    }
    async sendEmail(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userusecases.verifyEmail(req.body)
            res.status(user.status).json({
                success: user.success,
                message: user.message
            })
        } catch (error) {
            next(error)
        }
    }



    // @desc  verify the sended email from email
    //route     POST api/user/...
    async emailVerification(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userusecases.emailVerification(req.body)
            user &&
                res.status(user.status).json({
                    success: user.success,
                    // data: user.data,
                    message: user.message,
                });
        } catch (err) {
            next(err);
        }
    }

    async googleAuth(req: Req, res: Res, next: Next) {
        try {

            console.log('entered google authh', req.body)


            const user = await this.userusecases.googleAuth(req.body)

            user &&
                res.cookie("userJwt", user.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })

            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message
            })

        } catch (error) {
            next(error)

        }
    }


    // @desc    Login the existing user
    //route     POST api/user/login
    async loginUser(req: Req, res: Res, next: Next) {
        try {
            console.log('entereed login')

            const user = await this.userusecases.loginUser(req.body)
            user &&
                res.cookie("userJwt", user.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })

            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message
            })

        } catch (error) {
            next(error)

        }
    }
    async logout(req: Req, res: Res, next: Next){
        try {

            res.cookie("userJwt", "", {
                httpOnly: true,
                expires: new Date(0),
            });
            res.status(200).json({ message: "Logged out successfully" });



        } catch (error) {
            next(error) 

        }
    }

    async forgotPassword(req: Req, res: Res, next: Next) {
        try {

            const newUser = await this.userusecases.forgotPassword(req.body)

            newUser &&
                res.cookie("userJwt", newUser.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                })

            res.status(newUser.status).json({
                success: newUser.success,
                message: newUser.message,
                user: newUser.data
            })


        } catch (error) {
            next(error)

        }
    }



    async sendforgetPassOtp(req: Req, res: Res, next: Next) {
        try {

            const user = await this.userusecases.sendForgetPassOtp(req.body)

            if (user) {
                res.status(user.status).json({
                    success: user.success,
                    message: user.message
                })
            }

        } catch (err) {
            console.log(err)
            next(err)

        }
    }

    async payment(req: Req, res: Res, next: Next) {

        try {

            console.log('entered')

            const payment = await this.userusecases.createPayment(req.body)


            // console.log('the payment status in controller is :', payment)


            res.status(payment.status).json({
                data: payment.data,

            })


        } catch (error) {
            // console.log('the payment controller error is ', error)
            next(error)

        }
    }



    async webhook(req: Req, res: Res, next: Next) {
        try {
            let transactionId;

            // Parse the incoming webhook event
            const event = req.body;
            console.log('Webhook entered');
            console.log(event);

            // Check the type of event
            switch (event.type) {


                case 'checkout.session.completed':
                    // Handle charge succeeded event
                    const session = event.data.object;
                    const metadata = session.metadata;
                    const email = metadata.email;
                    const userId = metadata.userId;
                    const amount = metadata.amount;

                    // console.log('the session is :', session)



                    transactionId = event.data.object.payment_intent;

                    // console.log('The transaction id is :', transactionId);

                    await this.userusecases.finalConfirmation({ email, amount, transactionId, userId })


                    break;



                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }


            

            // Respond with a success message
            res.status(200).json({ received: true });
        } catch (error) {
            next(error);
        }
    }

}
