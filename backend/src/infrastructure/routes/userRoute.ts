
import express,{NextFunction,Request,Response} from 'express'
import { userAdapter } from './injection/userInjection'
import { Req } from '../types/expressTypes'


const router = express.Router()


router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
    console.log('entered into route')
    userAdapter.createUser(req,res,next)
})
router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
    
    userAdapter.loginUser(req,res,next)

})  

router.post('/sendEmail',(req:Request,res:Response,next:NextFunction)=>{

    userAdapter.sendEmail(req,res,next)
})

router.post('/verifyEmail',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.emailVerification(req,res,next)
    
})
router.post('/googleAuth',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.googleAuth(req,res,next)

})
router.post('/logout',(req:Request,res:Response,next:NextFunction)=>{
    console.log('entered g roteue')
 
    userAdapter.logout(req,res,next)
 
})
router.post('/forgot-password',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.forgotPassword(req,res,next)
})

router.post('/send-Forget-Pass-Otp',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.sendforgetPassOtp(req,res,next)
})

router.post('/payment',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.payment(req,res,next)
})


router.post('/webhook',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.webhook(req,res,next)
})


export default router