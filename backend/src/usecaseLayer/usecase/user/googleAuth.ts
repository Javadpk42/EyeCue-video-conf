import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import { StoreData, IResponse } from "../../interface/services/Iresponse";
import IHashPassword from "../../interface/services/IHashPassword";
import ErrorResponse from "../../handler/errorResponse";




export const googleAuth = async (
    userrepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt: Ijwt,
    username: string,
    email: string,
    password: string
): Promise<IResponse> => {
    try {
        const user = await userrepository.findUser(email);

        if (!user) {
            console.log(username)
            const hashedPassword = await bcrypt.createHash(password);
            const newUser = {
                username,
                email,
                password: hashedPassword,
            };
            const createNewUser = await userrepository.createUser(newUser);
            const token = jwt.createJWT(createNewUser._id as string, createNewUser.email, "register", createNewUser.username);
            return {
                status: 200,
                success: true,
                message: `Successfully Registered`,
                token: token,
                data: createNewUser,
            };
        }

        if (user && user._id) {
            if (user.isBlocked) {
                throw ErrorResponse.badRequest("You account is blocked");
              }
            const token = jwt.createJWT(user._id, user.email, "user", user.username);
            const responseData: StoreData = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };

            return {
                status: 200,
                success: true,
                token: token,
                data: responseData,
                message: `Login successful`,
            };
        }

        throw ErrorResponse.internalError('Server error')
    } catch (err) {
        console.log(err)

        throw err;
    }
};