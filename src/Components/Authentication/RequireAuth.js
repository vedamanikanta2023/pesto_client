import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./Auth";

export const RequireAuth = ({children})=>{
    const location = useLocation();
    const auth = useAuth();

    if (!auth?.isUserLoggedIn){
        return( 
            <Navigate to="/login" state={{path:location.pathname}}></Navigate>
        )
    }

    return children
}