
import { useContext, useRef, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';      
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import { AuthContext } from '../../context/AuthContext';

interface MenuProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

export const Menu = ({ visible, setVisible }: MenuProps ) => { 
    const [isOpen, setIsOpen] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const menu = useRef<TieredMenu>(null);
    const user = sessionStorage.getItem('us3r'); 
    const items: MenuItem[] = [
        {
            label:'Logout',
            icon:"pi pi-sign-out",
            command:() => { handleLogout() }
        }
    ];

    const handleLogout = async () => {
        await auth.logout();
        navigate('/');
    };

    return (
        <div className="card flex justify-content-center">
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={() => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div className="headercontent">
                            <div className='title'>
                                <Avatar shape="circle" icon="pi pi-user" size="large"/>
                                <TieredMenu model={items} popup ref={menu}/>
                                <Button label={user || "Usuário"} onClick={(e) => menu.current?.toggle(e)} />                           
                            </div>                          
                        </div>
                        <hr />
                        <div className="bodycontent">                        
                            <Link to='/usuario' className="menu-options" onClick={() => {setVisible(false)}}> 
                                <i className=" pi pi-user" style={{ fontSize: '1.1rem' }}></i>                                   
                                <span>Usuários</span>                                                    
                            </Link>   
                            <Link to='/tarefa' className="menu-options" onClick={() => {setVisible(false)}}>   
                                <i className=" pi pi-list-check" style={{ fontSize: '1.2rem' }}></i>                             
                                <span>Tarefas</span>
                            </Link>
                            <Link to='/projeto' className="menu-options" onClick={() => {setVisible(false)}}>   
                                <i className=" pi pi-inbox" style={{ fontSize: '1.2rem' }}></i>                             
                                <span>Projetos</span>
                            </Link>
                        </div>
                        <hr />
                        <div className="footercontent">  
                            <span className="footer">
                                <span>Projeto X</span>
                            </span> 
                        </div>
                    </div>
                )}
            ></Sidebar>
        </div>
    )
}