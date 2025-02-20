import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Login } from '../pages/Login';

export const RequireAuth = ({ children }: { children: JSX.Element}) => {

    const auth = useContext(AuthContext);

    if (auth.usuario === '' || !auth.login){
        return <Login />
    }
    
    return children;
};