
import {paymentDatas} from "../../../../usecaseLayer/interface/services/Iresponse";
import PaymentModel from "../../model/paymentModel";



export const paymentData = async (
    email:string,
    amount:string,
    transactionId:string,
    userId:string,
    PaymentModels:typeof PaymentModel
):Promise<paymentDatas | never>=>{
    try {


        const payment  = await PaymentModels.create({email,amount,transactionId,userId})
        await payment.save()

        const responseData:paymentDatas={
            _id:payment._id,
            amount:payment.amount,
            transactionId:payment.transactionId,
            userId:payment.userId,
            email:payment.email

        }

        return responseData

        


    } catch (error) {
        console.log(error)

        throw error
        
    }
}