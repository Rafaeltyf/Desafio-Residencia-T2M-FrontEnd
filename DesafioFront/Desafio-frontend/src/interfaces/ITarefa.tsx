export interface ITarefa {
    id?:number,
    titulo: string,
    descricao: string,
    projetoId: number,
    projeto:{
        id:number,
        titulo:string,
        prazo:Date
    }
}
