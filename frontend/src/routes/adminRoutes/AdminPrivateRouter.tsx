import { Navigate,Outlet } from "react-router-dom";

export function AdminPrivateRoute(){
    const admin=true
    return admin ?<Outlet/> :  <Navigate to="/admin/login" replace />
}