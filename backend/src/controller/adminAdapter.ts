// controller/adminAdapter.ts
import { Next, Req, Res } from '../infrastructure/types/expressTypes';
import { AdminUseCase } from '../usecaseLayer/usecase/adminUseCase';

export class AdminAdapters {
    private readonly adminUseCases: AdminUseCase;

    constructor(adminUseCases: AdminUseCase) {
        this.adminUseCases = adminUseCases;
    }

    async loginAdmin(req: Req, res: Res, next: Next) {
        try {
            const { email, password } = req.body;
            const response = await this.adminUseCases.loginAdmin(email, password);
            res.status(response.status).json({
                success: response.success,
                message: response.message,
                token: response.token,
                data: response.data
            });
        } catch (error) {
            next(error);
        }
    }
}
