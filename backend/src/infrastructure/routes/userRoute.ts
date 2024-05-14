
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
    console.log('entered g roteue')
    userAdapter.googleAuth(req,res,next)

})
router.post('/logout',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.logout(req,res,next)
 
})

export default router