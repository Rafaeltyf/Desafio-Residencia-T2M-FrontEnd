import { ChangeEvent, useEffect, useState } from "react";
import { IProjeto } from "../../interfaces/IProjeto";
import { useApi } from "../../services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

interface IProps {
    id: any;
    visible: boolean;
    close: () => void;
}

export function EditProjetoForm(props: IProps) {
    const [projeto, setProjeto] = useState<IProjeto>({
        titulo: "",
        prazo: new Date()
    });

    useEffect(() => {
        if (props.id !== undefined) {
            findProjeto(props.id);
        }
        projetoUndefined();
    }, [props.id]);

    async function findProjeto(id: number) {
        const response = await useApi().getProjetoId(id);
        if (response) {
            setProjeto({
                id: response.id,
                titulo: response.titulo,
                prazo: response.prazo
            });
        }
    }

    function projetoUndefined() {
        setProjeto({
            titulo: "",
            prazo: new Date()
        });
    }

    function updateProjeto(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setProjeto({
            ...projeto,
            [id]: value,
        });
    }

    async function Submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.id === undefined) {
            const response = await useApi().postProjeto(projeto);
            if (response.status === 200) props.close();
            projetoUndefined();
        } else {
            const response = await useApi().updateProjeto(projeto);
            if (response.status === 200) props.close();
        }
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => { props.close(); projetoUndefined(); }} className="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" onClick={(e: any) => Submit(e)} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Informações do Projeto" visible={props.visible} style={{ width: '50vw' }} onHide={props.close} footer={footerContent}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="titulo">Título</label>
                        <InputText id="titulo" value={projeto.titulo} onChange={(e: any) => updateProjeto(e)} />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="prazo">Prazo</label>
                        <Calendar id="prazo" value={projeto.prazo} onChange={(e: any) => setProjeto({ ...projeto, prazo: e.value })} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}