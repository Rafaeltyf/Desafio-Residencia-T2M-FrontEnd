import { useEffect, useRef, useState } from "react";
import { ITarefa } from "../../interfaces/ITarefa";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from './tarefa.module.css'
import { useApi } from "../../services";
import { EditTarefaForm } from "../../components/EditTarefaForm";

export const Tarefa = () => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([]);
    const [id, setId] = useState<number>();
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [quantidade, setQuantidade] = useState(15);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        getTarefas(pagina, quantidade);
    }, [pagina, quantidade]);

    const back = () => {
        getTarefas(pagina, quantidade);
        setId(undefined);
    }

    const getId = async (id: any) => {
        setId(id);
    }

    const getTarefas = async (pagina: number, quantidade: number) => {
        const response = await useApi().getTarefa(pagina, quantidade);
        setTotal(response.count);
        setTarefas(response.tarefas);
    }

    const deleteTarefa = async (id:number) => {
        const response = await useApi().deleteTarefa(id);
        getTarefas(pagina, quantidade);
    }

    const showTemplate = (id:number) => {
        confirmDialog({
            group: 'templating',
            header: 'Confirmação',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-triangle"></i>
                    <span>Deseja continuar com esta ação?</span>
                </div>
            ),
            accept: () => { deleteTarefa(id) },
            reject: () => { return },
            acceptLabel: 'Sim', 
            rejectLabel: 'Não'
        });
    };

    const openDialog = () => {
        setVisible(true);  
    };
    
    const closeDialog = () => {
        setVisible(false); 
        back(); 
    };

    return (
        <div className={styles.tarefa}>
            <div className={styles.content}>
                <EditTarefaForm id={id} visible={visible} close={() => { closeDialog(); back() }} />
                <Card header={
                    <div className={styles.header}>
                        <h2>Tarefas</h2>
                        <Button label="Nova Tarefa" icon="pi pi-plus" className="p-button-sm" onClick={openDialog} />
                    </div>
                }>
                    <Toast ref={toast} />
                    <ConfirmDialog group="templating" />
                    <DataTable className="custom-table" value={tarefas} resizableColumns showGridlines paginator rows={quantidade} rowsPerPageOptions={[10, 15, 25, 50]} tableStyle={{ minWidth: '50rem', borderRadius: '4px', overflow: 'hidden' }}>
                        <Column field="titulo" header="Título" />
                        <Column field="descricao" header="Descrição" />
                        <Column field="projeto.titulo" header="Projeto" />
                        <Column body={(rowData: any) => (
                            <div className="flex flex-wrap gap-2">
                                <Button type="button" icon="pi pi-pencil" className='p-button-icon-only p-button-outlined p-button-rounded' severity="success" onClick={() => { openDialog(); getId(rowData.id) }} rounded />
                                <Button type="button" icon="pi pi-trash" className='p-button-icon-only p-button-outlined p-button-rounded' severity="danger" onClick={() => showTemplate(rowData.id)} rounded />
                            </div>
                        )} headerClassName="w-10rem" />
                    </DataTable> 
                </Card>
            </div>
        </div>
    );
}