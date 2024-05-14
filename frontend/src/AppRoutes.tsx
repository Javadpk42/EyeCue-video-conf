import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Verification from "./pages/Verification"
import Test from "./pages/Test"

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/test' element={<Test/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/verification' element={<Verification/>}></Route>
            <Route path='/profile' element={<span>profile</span>}></Route>
            <Route path='*' element={<Navigate to="/"/>}></Route>
        </Routes>
    )
}

export default AppRoutes