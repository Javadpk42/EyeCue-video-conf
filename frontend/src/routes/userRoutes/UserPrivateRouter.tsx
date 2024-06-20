import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export function UserPrivateRoute(){
    const user  = useSelector((state) => state.user.currentUser);
    return user ?<Outlet/> :  <Navigate to="/user/signin" replace />
}