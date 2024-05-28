
import IStripe from "../../interface/services/IStripe"


export const confirmPayment = async(
    stripe:IStripe,
    req:any
):Promise<boolean|null>=>{
    try{

        // console.log('the request status from usecase confirmPayment',req)

        const paymentSuccess = await stripe.paymentSuccess(req)

        console.log('the payment data is :',paymentSuccess)

        if (!paymentSuccess) {
            console.log("Payment faileddddd");
            return null;
            } else {
            return true;
            }



    }catch(err){
        console.log(err)

        throw err
    }

}