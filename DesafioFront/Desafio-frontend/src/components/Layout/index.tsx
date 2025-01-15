import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import './Layout.css'

export const Layout = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (                        
        <div className='card flex flex-column align-items-center' style={{ backgroundColor: "#1f2937", width: "4.5rem", height: "100vh", paddingTop: "1rem", paddingLeft:"0.7rem" }}>
            <Button onClick={() => setVisible(true)} icon="pi pi-bars" style={{ alignSelf: 'center'}} />
            <Menu visible={visible} setVisible={setVisible} />
            <Outlet />
        </div>
    );
};