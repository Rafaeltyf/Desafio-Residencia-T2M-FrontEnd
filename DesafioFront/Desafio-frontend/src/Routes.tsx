import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export const AppRoutes = () => {    
    const auth = useContext(AuthContext);

    if (auth.usuario === '' || !auth.login) {
        return <Login />;
    } else {
        return (
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        );
    }
};