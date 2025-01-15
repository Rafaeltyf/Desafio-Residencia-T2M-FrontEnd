import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect, useRef, useState } from "react";
import { IProjeto } from "../../interfaces/IProjeto";
import { useApi } from "../../services";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import styles from './projeto.module.css'
import { EditProjetoForm } from "../../components/EditProjetoForm";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const Projeto = () => {
    const [projetos, setProjetos] = useState<IProjeto[]>([]);
    const [id, setId] = useState<number>();
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [quantidade, setQuantidade] = useState(15);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        getProjetos(pagina, quantidade);
    }, [pagina, quantidade]);

    const back = () => {
        getProjetos(pagina, quantidade);
        setId(undefined);
    }

    const getId = async (id: any) => {
        setId(id);
    }

    const getProjetos = async (pagina: number, quantidade: number) => {
        const response = await useApi().getProjeto(pagina, quantidade);
        setTotal(response.count);
        setProjetos(response.projetos);
    }

    const deleteProjeto = async (id:number) => {
        const response = await useApi().deleteProjeto(id);
        getProjetos(pagina, quantidade);
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
            accept: () => { deleteProjeto(id) },
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
        <div className={styles.projeto}>
            <div className={styles.content}>
                <EditProjetoForm id={id} visible={visible} close={() => { closeDialog(); back() }} />
                <Card header={
                    <div className={styles.header}>
                        <h2>Projetos</h2>
                        <Button label="Novo Projeto" icon="pi pi-plus" className="p-button-sm" onClick={openDialog} />
                    </div>
                }>
                    <Toast ref={toast} />
                    <ConfirmDialog group="templating" />
                    <DataTable className="custom-table" value={projetos} resizableColumns showGridlines paginator rows={quantidade} rowsPerPageOptions={[10, 15, 25, 50]} tableStyle={{ minWidth: '50rem', borderRadius: '4px', overflow: 'hidden' }}>
                        <Column field="titulo" header="Título" />
                        <Column field="prazo" header="Prazo" body={(rowData: any) => (new Date(rowData.prazo).toLocaleDateString())} />
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