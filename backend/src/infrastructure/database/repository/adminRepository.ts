import { IAdmin } from "../../../domain/admin";
import { IAdminRepository } from "../../../usecaseLayer/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";

export class AdminRepository implements IAdminRepository {
    constructor(private readonly adminModel: typeof AdminModel) {}

    async findAdminByEmail(email: string): Promise<IAdmin | null> {
        return this.adminModel.findOne({ email }).exec();
    }
}
