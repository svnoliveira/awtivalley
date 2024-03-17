export interface IRegistroDePonto{
    id: number;
    entrada: string;
    saida: string;
    horas: string;
    justificativa: string;
    user: number; // user_id
}

export interface IRegistroDePontoCreate{
    entrada: string;
    saida: string;
}

export interface IRegistroDePontoState{
    pontoList: IRegistroDePonto[];
    indicadorMenu: "semanal" | "ponto"
    loading: boolean;
    setIndicadorMenu: (option: "semanal" | "ponto") => void
    loadPontos: () => Promise<void>;
    setLoading: (boolean: boolean) => void;
    addPonto: (pontoData: IRegistroDePontoCreate, userId: number) => 
    Promise<boolean | IRegistroDePonto>
    deletePonto: (id:number, token: string) => Promise<boolean | void>
}