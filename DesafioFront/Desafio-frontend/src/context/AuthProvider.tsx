import { useState } from "react";
import { useApi } from "../services";
import { AuthContext } from "./AuthContext";

export type IProps = {
    children:any
}

export const AuthProvider= (props:IProps) => {
    const [usuario, setUsuario] = useState<string>('');    
    const [error, setError] = useState<any>();
    const api = useApi();

    const handleLogin = async (login: string, senha: string) =>{
        try{

            const data = await api.login(login, senha);
            if(data.login){
                setUsuario(data.login);
                sessionStorage.setItem('us3r', login);
                return true;
            }
        }catch(err:any){
            const { data } = err.response;
            setError(data.Message);
            return false;
        }
    }

    const handleLogout = async () => {
        await api.logout();
        sessionStorage.removeItem('us3r');
        setUsuario('');
    };

    const contextValue = {
        usuario: usuario,
        error: error,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
    
}