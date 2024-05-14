import JwtPassword from "../../services/jwt";
import { UserAdapters } from "../../../controller/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcryptjs";
import NodeMailer from "../../services/nodeMailer";


const userRepository = new UserRepository(UserModel)
const jwt = new JwtPassword()
const bycrypt = new Encrypt()
const nodemailer= new NodeMailer()
const userusecases = new UserUseCase(
    userRepository,
    jwt,
    bycrypt,
    nodemailer
)

const userAdapter = new UserAdapters(userusecases)

export { userAdapter}