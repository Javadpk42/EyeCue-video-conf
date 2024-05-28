import JwtPassword from "../../services/jwt";
import { UserAdapters } from "../../../controller/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcryptjs";
import NodeMailer from "../../services/nodeMailer";
import StripeService from "../../services/stripe";
import PaymentModel from "../../database/model/paymentModel";


const userRepository = new UserRepository(UserModel,PaymentModel)
const jwt = new JwtPassword()
const bycrypt = new Encrypt()
const nodemailer= new NodeMailer()
const stripe =new StripeService()
const userusecases = new UserUseCase(
    userRepository,
    jwt,
    bycrypt,
    nodemailer,
    stripe
)


const userAdapter = new UserAdapters(userusecases)
console.log('injection')

export { userAdapter}