import { IUser } from "../../../../domain/user";
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";


export const createUser = async(
    newUser:IUser,
    userModel:typeof UserModel
): Promise<StoreData> =>{
    try {

        const user = await userModel.create(newUser)
        await user.save()
        const responseData:StoreData={
            _id:user._id,
            email :user.email,
            username:user.username

        }
        return responseData
        
    } catch (error) {

        throw(error)
        
    }
}