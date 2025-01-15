import axios from 'axios';
import { IUsuario } from '../interfaces/IUsuario';
import { IEdicao } from '../interfaces/IEdicao';
import { IProjeto } from '../interfaces/IProjeto';
import { ITarefa } from '../interfaces/ITarefa';

export const api = axios.create({
    baseURL: 'http://localhost:5002',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const useApi = () => ({
    login: async (login: string, senha: string) => {
        const response = await api.post(`/api/Login/login`, {login, senha});
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/api/Login/logout');
        return response.data;
    },

    /*------------------------------------Usuário------------------------------------*/
    getUsuarioId: async(id:number) => {
        const response = await api.get(`/api/Usuario/ObterUsuario?id=${id}`)
        return response.data;
    },
    getUsuario: async(pagina:number, quantidade:number) => {
        const response = await api.get(`/api/Usuario/ListarUsuarios?&PageIndex=${pagina}&PageCount=${quantidade}`);
        return response.data;
    },
    updateUsuario: async(props:IUsuario) => {
        const response = await api.put<IUsuario>(`/api/Usuario/EditarUsuario`, props);
        return response;
    },
    postUsuario: async(props:IUsuario) => {
        const response = await api.post<IUsuario>(`/api/Usuario/AdicionarUsuario`, props);
        return response;
    },
    deleteUsuario: async(UserId:number) => {
        const response = await api.delete(`/api/Usuario/RemoverUsuario?id=${UserId}`);
        return response;
    },
    editSenha: async(props:IEdicao) => {
        const response = await api.put<IEdicao>(`/api/Usuario/EditarSenha`, props);
        return response;
    },

     /*------------------------------------Projetos------------------------------------*/

    getProjetoId: async(id:number) => {
        const response = await api.get(`/api/Projeto/ObterProjeto?id=${id}`)
        return response.data;
    },
    getProjeto: async(pagina:number, quantidade:number) => {
        const response = await api.get(`api/Projeto/ListarProjetos?PageIndex=${pagina}&PageCount=${quantidade}`);
        return response.data;
    },
    updateProjeto: async(props:IProjeto) => {
        const response = await api.put<IProjeto>(`/api/Projeto/EditarProjeto`, props);
        return response;
    },
    postProjeto: async(props:IProjeto) => {
        const response = await api.post<IProjeto>(`/api/Projeto/AdicionarProjeto`, props);
        return response;
    },
    deleteProjeto: async(Id:number) => {
        const response = await api.delete(`/api/Projeto/RemoverProjeto?id=${Id}`);
        return response;
    },

    /*------------------------------------Tarefas------------------------------------*/
    getTarefaId: async(id:number) => {
        const response = await api.get(`/api/Tarefa/ObterTarefa?id=${id}`)
        return response.data;
    },
    getTarefa: async(pagina:number, quantidade:number) => {
        const response = await api.get(`api/Tarefa/ListarTarefas?PageIndex=${pagina}&PageCount=${quantidade}`);
        return response.data;
    },
    updateTarefa: async(props:ITarefa) => {
        const response = await api.put<IProjeto>(`/api/Tarefa/EditarTarefa`, props);
        return response;
    },
    postTarefa: async(props:ITarefa) => {
        const response = await api.post<IProjeto>(`/api/Tarefa/AdicionarTarefa`, props);
        return response;
    },
    deleteTarefa: async(Id:number) => {
        const response = await api.delete(`/api/Tarefa/RemoverPessoa?id=${Id}`);
        return response;
    },
})