
import UserModel from "../../model/userModel";
import { IforgotPassword,StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";


export const forgotPassword = async(
    password:IforgotPassword,
    userModels: typeof UserModel
):Promise<StoreData | never>=>{



    try {
        console.log(password.email)
        const user = await userModels.findOne({email:password.email})
        console.log(user)
        if(user){
            user.password = password.password
            await user.save()
            const responseData = {
                _id:user._id,
                username:user.username,
                email:user.email
            }
            return responseData
        }
    
        throw new Error('Internal server error')
        
    } catch (error) {
        throw error
        
    }

  

}