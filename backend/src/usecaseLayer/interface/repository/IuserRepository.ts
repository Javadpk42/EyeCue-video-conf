import { IUser } from "../../../domain/user";
import { IforgotPassword, StoreData } from "../services/Iresponse";

export interface IUserRepository{
    createUser(newUser:IUser):Promise<StoreData>
    findUser(email: string): Promise<IUser | null>;
    forgotPassword(newPassword:IforgotPassword):Promise<StoreData>
    payment(email:string):Promise<StoreData>;
    paymentData(email:string,amount:string,transactionId:string,userId:string): Promise<paymentDatas>;
}