import { Navigate, Route, Routes } from "react-router-dom"
import { UserPrivateRoute } from './UserPrivateRouter';


import Home from "../../pages/user/Home" 
import SignUp from "../../pages/user/SignUp"
import SignIn from "../../pages/user/SignIn"
import Otp from "../../pages/user/Otp"
import Forgot from "../../pages/user/Forgot"
import OtpForgot from "../../pages/user/OtpForgot"
import ResetPass from "../../pages/user/ResetPass"
import Premium from "../../pages/user/Premium"

import Lobby from "@/pages/user/Lobby";
import Room from "@/pages/user/room";

export const UserRoutes=()=>{
    return( 
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/verification' element={<Otp/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/forgot' element={<Forgot/>}></Route>
            <Route path='/otpforgot' element={<OtpForgot/>}></Route>
            <Route path='/reset-password' element={<ResetPass/>}></Route>

                <Route path='/*' element={<UserPrivateRoute/>} >
                
                    <Route path='premium' element={<Premium/>}></Route>
                    <Route path='lobby' element={<Lobby/>}></Route>
                    <Route path='room/:roomId' element={<Room/>}></Route>

                </Route>

            <Route path='*' element={<Navigate to="/"/>}></Route>
        </Routes>
    )
}

