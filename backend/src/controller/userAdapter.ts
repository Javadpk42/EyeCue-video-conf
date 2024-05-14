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
}
