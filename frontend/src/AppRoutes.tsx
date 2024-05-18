import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/user/Home"
import SignUp from "./pages/user/SignUp"
import SignIn from "./pages/user/SignIn"
import Otp from "./pages/user/Otp"
import Forgot from "./pages/user/Forgot"
import OtpForgot from "./pages/user/OtpForgot"
import ResetPass from "./pages/user/ResetPass"

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/verification' element={<Otp/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/forgot' element={<Forgot/>}></Route>
            <Route path='/otpforgot' element={<OtpForgot/>}></Route>
            <Route path='/reset-password' element={<ResetPass/>}></Route>

            <Route path='*' element={<Navigate to="/"/>}></Route>
        </Routes>
    )
}

export default AppRoutes 