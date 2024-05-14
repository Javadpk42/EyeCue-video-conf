import { IUser } from "../../../domain/user"
import { IUserRepository } from "../../interface/repository/IuserRepository"
import Ijwt from "../../interface/services/Ijwt"
import { StoreData, IResponse } from "../../interface/services/Iresponse"
import IHashPassword from "../../interface/services/IHashPassword"
import ErrorResponse from "../../handler/errorResponse"


export const loginUser = async (
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt: Ijwt,
    email: string,
    password: string
): Promise<IResponse> => {
    try {

        const user: IUser | null = await userRepository.findUser(email)

        if (user && user._id) {

            const checkPasswordMatch: boolean = await bcrypt.compare(password, user.password)
            if (checkPasswordMatch) {

                const token = jwt.createJWT(user._id, user.email, 'user', user.username)

                const responseData:StoreData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }

                return {
                    status: 200,
                    success: true,
                    data: responseData,
                    token: token,
                    message: `Logined Successfully`

                }
            }
            throw ErrorResponse.badRequest('Wrong Password or Email')


        }
        throw ErrorResponse.notFound('Wrong Password or Email')

    } catch (error) {
        console.log(error)
        throw error
    }
}