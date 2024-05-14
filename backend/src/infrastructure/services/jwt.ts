import jwt from 'jsonwebtoken'
import Ijwt from '../../usecaseLayer/interface/services/Ijwt'

class JwtPassword implements Ijwt{
    createJWT(userId: string, email: string, username: string): string {
        const jwtKey = process.env.JWT_KEY
        if(jwtKey){
            const token:string = jwt.sign(
                {id:userId,username:username,email:email},
                jwtKey,
                {expiresIn: '30d'}
            )
            return token
        }
        throw new Error('JWT_KEY not defined')
        
    }
}


export default JwtPassword