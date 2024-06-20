import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { loginAdmin } from "./admin/loginAdmin";
import IHashPassword from "../interface/services/IHashPassword";
import Ijwt from "../interface/services/Ijwt";

export class AdminUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly bcrypt: IHashPassword;
    private readonly jwt: Ijwt;

    constructor(adminRepository: IAdminRepository, bcrypt: IHashPassword, jwt: Ijwt) {
        this.adminRepository = adminRepository;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    async loginAdmin(email: string, password: string) {
        return loginAdmin(this.adminRepository, this.bcrypt, this.jwt, email, password);
    }
}