

interface IHashPassword {
    createHash(password:string):Promise<string>;
    compare(password:string,hashpasword:string): Promise<boolean>;
}

export default IHashPassword