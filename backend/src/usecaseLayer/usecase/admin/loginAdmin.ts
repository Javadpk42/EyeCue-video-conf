// usecaseLayer/usecase/adminUseCase.ts
import { IAdminRepository } from "../interface/repository/IAdminRepository";
import IHashPassword from "../interface/services/IHashPassword";
import Ijwt from "../interface/services/Ijwt";
import { IResponse } from "../interface/services/Iresponse";

export async function loginAdmin(
    adminRepository: IAdminRepository,
    bcrypt: IHashPassword,
    jwt: Ijwt,
    email: string,
    password: string
): Promise<IResponse> {
    const admin = await adminRepository.findAdminByEmail(email);

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return {
            status: 401,
            success: false,
            message: "Invalid email or password",
        };
    }

    const token = jwt.createJWT(admin._id, admin.email, "admin", "admin");

    return {
        status: 200,
        success: true,
        message: "Admin logged in successfully",
        token,
        data: { email: admin.email, id: admin._id }
    };
}

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
