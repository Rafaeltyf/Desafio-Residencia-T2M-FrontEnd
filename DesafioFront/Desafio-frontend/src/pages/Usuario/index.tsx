import { Card } from 'primereact/card'
import styles from './usuario.module.css'
import { useEffect, useRef, useState } from 'react'
import { IUsuario } from '../../interfaces/IUsuario';
import { useApi } from '../../services';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { EditUsuarioForm } from '../../components/EditUsuarioForm';

export const Usuario = () => {
    const [usuario, setUsuario] = useState<IUsuario[]>([]);
    const [id, setId] = useState<number>();
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [quantidade, setQuantidade] = useState(15);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        getUsuario(pagina, quantidade);
    }, [pagina, quantidade]);

    const back = () => {
        getUsuario(pagina, quantidade);
        setId(undefined);
    }

    const getId = async (id: any) => {
        setId(id);
    }

    const getUsuario = async (pagina: number, quantidade: number) => {
        const response = await useApi().getUsuario(pagina, quantidade);
        setTotal(response.count);
        setUsuario(response.usuarios);
    }

    const deleteUsuario = async (id:number) => {
        const response = await useApi().deleteUsuario(id);
        getUsuario(pagina, quantidade);
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
            accept: () => {deleteUsuario(id)},
            reject: () => {return},
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
        <div className={styles.usuario}>
            <div className={styles.content}>
                <EditUsuarioForm id={id} visible={visible} close={() => { closeDialog() ; back() } }></EditUsuarioForm>   
                <Card header={
                    <div className={styles.header}>
                        <h2>Usuarios</h2>
                        <Button label="Novo Usuário" icon="pi pi-plus" className="p-button-sm" onClick={() => {openDialog()}} />
                    </div>
                }>
                    <Toast ref={toast} />
                    <ConfirmDialog group="templating" />
                    <DataTable className="custom-table" value={usuario} resizableColumns showGridlines paginator rows={quantidade} rowsPerPageOptions={[10, 15, 25, 50]} tableStyle={{ minWidth: '50rem', borderRadius: '4px', overflow: 'hidden' }}>
                        <Column field="nome" header="Nome" ></Column>
                        <Column field="login" header="Login"></Column>                  
                        <Column field="projeto.titulo" header="Projeto" ></Column>   
                        <Column body={(rowData: any) => (
                            <div className="flex flex-wrap gap-2">
                                <Button type="button" icon="pi pi-pencil" className='p-button-icon-only p-button-outlined p-button-rounded' severity="success" onClick={() => {openDialog(); getId(rowData.id)}} rounded></Button>
                                <Button type="button" icon="pi pi-trash" className='p-button-icon-only p-button-outlined p-button-rounded' severity="danger" onClick={() => showTemplate(rowData.id)} rounded></Button>
                            </div>
                        )} headerClassName="w-10rem" />
                    </DataTable> 
                </Card>
            </div>
        </div>
    )
}