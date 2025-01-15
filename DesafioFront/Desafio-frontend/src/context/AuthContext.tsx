import { createContext } from 'react';

export type AuthContextType = {
    usuario: string;
    error: any;
    login: (login: string, senha: string) => Promise<boolean|undefined>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);