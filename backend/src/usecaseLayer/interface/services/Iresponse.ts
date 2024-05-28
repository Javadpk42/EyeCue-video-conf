
import { IUser } from "../../../domain/user";


export interface StoreData{
    _id:string;
    username:string;
    email:string;
    isVerified?:boolean;
}


export interface IResponse<T = StoreData | string |null>{
    status:number;
    success?:boolean;
    message?:string;
    data?:T
    token?:string




}

export interface IUserResponse<T = IUser| IUser[]|string>{
    status: number;
    success: boolean;
    message?: string;
    data?: T;
    token? : string

}

export interface IforgotPassword {
    email:string;
    password:string
}

export interface IcreatePayment{
    _id?:string;
    email?:string;
    amount?:number;
    transactionId?:string;
    userId?:string;

}

export interface paymentDatas{
    _id?:string;
    amount?:number;
    transactionId?:string;
    userId?:string;
    email?:string;
}