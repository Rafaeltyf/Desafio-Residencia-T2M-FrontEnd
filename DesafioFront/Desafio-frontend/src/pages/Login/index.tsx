import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Message } from "../../components/Message";
import './Login.css';

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [validaUser, setValidaUser] = useState<boolean>(false);
    const [validaPassword, setValidaPassWord] = useState<boolean>(false);

    const validaCampos = () => {
        if(login == "") setValidaUser(true);
        if(senha == "") setValidaPassWord(true);
    };

    useEffect(() => {
        if(login != "")setValidaUser(false);
        if(senha != "")setValidaPassWord(false);

        const clickEnter = (e: any) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              e.preventDefault();
              handleLogin();
            }
          };
          document.addEventListener("keydown", clickEnter);
          return () => {
            document.removeEventListener("keydown", clickEnter);
          };

    }, [login, senha]);

    const handleLogin = async () => {
        validaCampos();
        if (!login || !senha) {
            setVisible(true);
            const time = setTimeout(() => {
                setVisible(false);
            }, 2500);    
            return () => clearTimeout(time);
        }
        if (login && senha) {
            const isLogged = await auth.login(login, senha);
            if (isLogged) {
                navigate('/usuario');
            }else {
                setVisible(true);
                setLogin('');
                setSenha('');
                const time = setTimeout(() => {
                    setVisible(false);
                }, 2500);    
                return () => clearTimeout(time);
            }
        }
    }

    return (
        <div className="cardlogin">        
        <Card style={{ height:"45%", width: "25rem", marginBottom: "2em" }} className="p-card p-shadow-2">
            <h3 style={{ textAlign: "center" }}>Projeto X</h3>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-lg-1">
                    <FloatLabel style={{ marginTop: '30px' }}>
                        <label htmlFor="username">Username</label>
                        <InputText 
                            id="username" 
                            type="text" 
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                            required={true}
                        />
                    </FloatLabel>
                </div>
                <div className="p-field p-col-12 p-lg-1">
                    <FloatLabel style={{ marginTop: '30px' }}>
                        <label htmlFor="password">Password</label>
                        <InputText 
                            id="password" 
                            type="password" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            required={true}
                        />
                    </FloatLabel>
                </div>
                <div className="p-field p-col-12 p-lg-1" style={{ marginTop: '20px' }}>
                    <Button label="Login" onClick={handleLogin}></Button>
                    {visible && <Message typeMessage={false} message={auth.error || "Campos obrigatórios não preenchidos"} />}  
                </div>
            </div>
        </Card>
    </div>
    );
};