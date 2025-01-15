export interface IUsuario {
    id?: number,
    login:string,
    senha:string,
    nome:string,
    projetoId: number,
    projeto:{
        id:number,
        titulo:string,
        prazo:Date
    }
}