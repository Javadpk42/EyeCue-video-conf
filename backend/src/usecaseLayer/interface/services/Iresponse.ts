
import { IUser } from "../../../domain/user";


export interface StoreData{
    _id:string;
    username:string;
    email:string;
    isVerified?:boolean;
}


export interface IResponse<T = StoreData | string |null>{
    status:number;
    success:boolean;
    message?:string;
    data?:T
    token?:string




}

export interface IforgotPassword {
    email:string;
    password:string
}