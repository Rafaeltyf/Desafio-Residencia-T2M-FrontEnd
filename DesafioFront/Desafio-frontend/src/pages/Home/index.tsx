import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Usuario } from "../Usuario";
import { Tarefa } from "../Tarefa";
import { Projeto } from "../Projeto";
import { Menu } from "../../components/Menu";
import { Layout } from "../../components/Layout";
import './home.css'

export const Home = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className='home'> 
            <div className='header'></div>
            <Menu visible={visible} setVisible={setVisible} /> 
            <Layout />
            <Routes>
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/tarefa" element={<Tarefa />} />
                <Route path="/projeto" element={<Projeto />} />
            </Routes>
        </div>
    );
};