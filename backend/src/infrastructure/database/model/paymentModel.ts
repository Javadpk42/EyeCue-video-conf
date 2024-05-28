
import mongoose,{Document,Schema,Model} from "mongoose";
import { IPayment } from "../../../domain/payment";


const paymentSchema:Schema = new Schema<IPayment & Document>({

    transactionId:{type:String,required:true},
    amount:{type:Number,required:true},
    userId:{type:String,required:true},
    email:{type:String,required:true},



},{
    timestamps:true
}) 

const PaymentModel: Model<IPayment & Document> = mongoose.model<IPayment & Document>("payment",paymentSchema)


export default PaymentModel