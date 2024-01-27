import { IUser } from "./@userTypes";

export interface ICurso{
    id: number;
    nome: string;
    users: number[]; //user_id list
}

export interface ICursoState{
    cursoList: ICurso[];
    loading: boolean;
    
    setCursoList: (list: ICurso[]) => void
    setLoading: (boolean:boolean) => void
    loadCursos: () => Promise<void>
    addCurso: (
        curso: ICurso,
        user: IUser
    ) => Promise<void>
    removeCurso: (
        curso: ICurso,
        user: IUser
    ) => Promise<void>
}