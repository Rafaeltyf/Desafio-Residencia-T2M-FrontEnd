import React, { useState, useEffect, ChangeEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useApi } from '../../services';
import { IUsuario } from '../../interfaces/IUsuario';

interface IProps {
    id: number | undefined;
    visible: boolean;
    close: () => void;
}

export function EditUsuarioForm(props: IProps) {
    const [usuario, setUsuario] = useState<IUsuario>({
        login: "",
        senha: "",
        nome:"",    
        projetoId: 0,
        projeto: {
            id:0,
            titulo:"",
            prazo:new Date()
        }
    });
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [projetos, setProjetos] = useState<{ label: string, value: number }[]>([]);

    useEffect(() => {
        projeto(0, 1000);        
        if (props.id !== undefined) {
            findUsuario(props.id);
        }
        usuarioUndefined()
    }, [props.id]);

    async function projeto(pagina: number, quantidade: number) {
        const response = await useApi().getProjeto(pagina, quantidade);
        console.log(response.projetos)
        const formattedProjetos = response.projetos.map((proj: any) => ({
            label: proj.titulo,
            value: proj.id
        }));
        setProjetos(formattedProjetos);
    }

    useEffect(() => {
        if (props.id != undefined) {
            findUsuario(props.id);
        }
        usuarioUndefined();
    }, [props.id]);

    async function findUsuario(id: number) {
        const response = await useApi().getUsuarioId(id);        
        if (response) {
            setUsuario({
                id: response.id,
                login: response.login,
                senha: "",
                nome: response.nome,
                projetoId: response.projetoId,
                projeto: {
                    id:response.projeto.Id,
                    titulo:response.projeto.titulo,
                    prazo:response.projeto.prazo
                }
            });
        }
    }

    function usuarioUndefined() {
        setUsuario({
            login: "",
            senha: "",
            nome:"",    
            projetoId: 0,
            projeto: {
                id:0,
                titulo:"",
                prazo:new Date()
            }
        });
        setSenha("");
        setConfirmarSenha("");
    }

    function updateUsuario(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;

        if (id === "nome") {
            setUsuario({
                ...usuario,
                projeto: {
                    ...usuario.projeto,
                    titulo: value,
                }
            });
        } else {
            setUsuario({
                ...usuario,
                [id]: value,
            });
        }
    }

    async function Submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.id === undefined) {
            if(senha === "" || confirmarSenha === "" || usuario.login === "" || usuario.nome === ""){
                alert("Preencha os campos corretamente!");
                return;
            }
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }
            const response = await useApi().postUsuario({
                ...usuario,
                senha: senha
            });
            if (response.status === 200) props.close();
                usuarioUndefined();
        } else {
            const response = await useApi().updateUsuario(usuario);
            if (response.status === 200) props.close();
        }
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={props.close} className="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" onClick={(e: any) => Submit(e)} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Informações do Usuário" visible={props.visible} style={{ width: '50vw' }} onHide={props.close} footer={footerContent}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="field">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" value={usuario.nome} onChange={updateUsuario} />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="login">Login</label>
                        <InputText id="login" value={usuario.login} onChange={updateUsuario} />
                    </div>
                    {props.id === undefined && (
                        <>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="senha">Senha</label>
                                <InputText id="senha" type="password" value={senha} onChange={(e: any) => setSenha(e.target.value)} />
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                                <InputText id="confirmarSenha" type="password" value={confirmarSenha} onChange={(e: any) => setConfirmarSenha(e.target.value)} />
                            </div>
                        </>
                    )}
                    <div className="flex flex-column gap-2">
                        <label htmlFor="projetoId">Projeto</label>
                        <Dropdown id="projetoId" value={usuario.projetoId} options={projetos} 
                            onChange={(e: any) => setUsuario({ ...usuario, projetoId: e.value })} placeholder="Selecione o projeto" className="w-full md:w-14rem" />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
