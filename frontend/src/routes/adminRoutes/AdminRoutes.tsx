import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AdminPrivateRoute } from './AdminPrivateRouter';
import { Home } from '../../pages/admin/Home';
import AdminSignIn from '@/pages/admin/Login';
import Transactions from '@/pages/admin/Payment';
import Plans from '@/pages/admin/Plans';


export function AdminRoutes (){

   
    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/signin' element={<AdminSignIn/>}></Route>
            <Route path='/transactions' element={<Transactions/>}></Route>
            <Route path='/plans' element={<Plans/>}></Route>

            


            <Route path='/*' element={<AdminPrivateRoute/>}>
                
            </Route>
                
        </Routes>
    )
}

