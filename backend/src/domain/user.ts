export interface IUser{
    _id?:string;
    username:string;
    password:string;
    // confirmPassword:string;
    email:string;
    profileImage?:string;
    isBlocked?:Boolean;
    isVerified?:Boolean;
    isPremium?:Boolean 
}