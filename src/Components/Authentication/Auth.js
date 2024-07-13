import * as React from 'react';
import { useDispatch,useSelector } from "react-redux";
import {app} from '../actions/appActions';

const AuthContext = React.createContext();

export const AuthProvider = ({children})=>{
    const isUserLoggedIn = useSelector((state)=>state.app.isLoggedIn);
    const dispatch = useDispatch();

    const login =(loginDetails)=>{
        dispatch(app(loginDetails));
    };

    const logout = ()=>{
        dispatch(app({type:'logout',payload:{}}));
    };

    return(
        <AuthContext.Provider value={{isUserLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return React.useContext(AuthContext);
}