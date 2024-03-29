import { IUser } from "./@userTypes";

export interface IEspecialidade{
    id: number;
    nome: string;
    users: number[]; //user_id list
}

export interface IEspecialidadeState{
    especialidadeList: IEspecialidade[];
    loading: boolean;
    
    setEspecialidadeList: (list: IEspecialidade[]) => void
    setLoading: (boolean:boolean) => void
    loadEspecialidades: () => Promise<void>
    addEspecialidade: (
        especialidade: IEspecialidade,
        user: IUser
    ) => Promise<void>
    removeEspecialidade: (
        especialidade: IEspecialidade,
        user: IUser
    ) => Promise<void>
    registerEspecialidade: (token: string, especialidade: string) => Promise<boolean | void>;
  editEspecialidade: (
    token: string,
    especialidade: string,
    id: number
  ) => Promise<boolean | void>;
    deleteEspecialidade: (token: string, id: number) => Promise<boolean | void>;
}