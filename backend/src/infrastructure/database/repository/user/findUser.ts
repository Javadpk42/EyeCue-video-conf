import UserModel from "../../model/userModel";


export const findUser = async(
    email:string,
    userModels:typeof UserModel
)=>{

    try {

        const existingUser = await userModels.findOne({email:email})
        console.log('the existing user is :', existingUser)
        return existingUser
        
    } catch (error) {
        throw error
        
    }
}