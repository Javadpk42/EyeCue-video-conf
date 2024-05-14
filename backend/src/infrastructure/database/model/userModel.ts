
import mongoose,{Document,Schema,Model} from "mongoose";
import { IUser } from "../../../domain/user";


const userSchema:Schema = new Schema<IUser & Document>({

    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{type:String},
    isBlocked:{type:Boolean,default: false},
    isVerified:{type:Boolean,default: false},
    isPremium:{type:Boolean,default: false},
    


},{
    timestamps:true
}) 

const UserModel: Model<IUser & Document> = mongoose.model<IUser & Document>("User",userSchema)


export default UserModel