import { ChangeEvent, useEffect, useState } from "react";
import { ITarefa } from "../../interfaces/ITarefa";
import { useApi } from "../../services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

interface IProps {
    id: any;
    visible: boolean;
    close: () => void;
}

export function EditTarefaForm(props: IProps) {
    const [tarefa, setTarefa] = useState<ITarefa>({
        titulo: "",
        descricao: "",
        projetoId: 0,
        projeto: {
            id: 0,
            titulo: "",
            prazo: new Date()
        }
    });
    const [projetos, setProjetos] = useState<{ label: string, value: number }[]>([]);

    useEffect(() => {
        projeto(0, 1000);
        if (props.id !== undefined) {
            findTarefa(props.id);
        }
        tarefaUndefined();
    }, [props.id]);

    async function projeto(pagina: number, quantidade: number) {
        const response = await useApi().getProjeto(pagina, quantidade);
        const formattedProjetos = response.projetos.map((proj: any) => ({
            label: proj.titulo,
            value: proj.id
        }));
        setProjetos(formattedProjetos);
    }

    async function findTarefa(id: number) {
        const response = await useApi().getTarefaId(id);
        if (response) {
            setTarefa({
                id: response.id,
                titulo: response.titulo,
                descricao: response.descricao,
                projetoId: response.projetoId,
                projeto: {
                    id: response.projeto.id,
                    titulo: response.projeto.titulo,
                    prazo: response.projeto.prazo
                }
            });
        }
    }

    function tarefaUndefined() {
        setTarefa({
            titulo: "",
            descricao: "",
            projetoId: 0,
            projeto: {
                id: 0,
                titulo: "",
                prazo: new Date()
            }
        });
    }

    function updateTarefa(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setTarefa({
            ...tarefa,
            [id]: value,
        });
    }

    async function Submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.id === undefined) {
            const response = await useApi().postTarefa(tarefa);
            if (response.status === 200) props.close();
            tarefaUndefined();
        } else {
            const response = await useApi().updateTarefa(tarefa);
            if (response.status === 200) props.close();
        }
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => { props.close(); tarefaUndefined(); }} className="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" onClick={(e: any) => Submit(e)} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Informações da Tarefa" visible={props.visible} style={{ width: '50vw' }} onHide={props.close} footer={footerContent}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="titulo">Título</label>
                        <InputText id="titulo" value={tarefa.titulo} onChange={(e: any) => updateTarefa(e)} />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="descricao">Descrição</label>
                        <InputText id="descricao" value={tarefa.descricao} onChange={(e: any) => updateTarefa(e)} />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="projetoId">Projeto</label>
                        <Dropdown id="projetoId" value={tarefa.projetoId} options={projetos} 
                            onChange={(e: any) => setTarefa({ ...tarefa, projetoId: e.value })} placeholder="Selecione o projeto" className="w-full md:w-14rem"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}