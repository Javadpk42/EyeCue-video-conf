import JwtPassword from "../../services/jwt";
import Encrypt from "../../services/bcryptjs";
import { AdminAdapters } from "../../../controller/adminAdapter";
import { AdminUseCase } from "../../../usecaseLayer/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";

const adminRepository = new AdminRepository(AdminModel);
const jwt = new JwtPassword();
const bcrypt = new Encrypt();
const adminUseCases = new AdminUseCase(adminRepository, jwt, bcrypt);

const adminAdapter = new AdminAdapters(adminUseCases);

export { adminAdapter };
