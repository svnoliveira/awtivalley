import { IUser } from "./@userTypes";

export interface ICurso {
  id: number;
  nome: string;
  users: number[]; //user_id list
  validade: number
}

export interface ICursoState {
  cursoList: ICurso[];
  loading: boolean;

  setCursoList: (list: ICurso[]) => void;
  setLoading: (boolean: boolean) => void;
  loadCursos: () => Promise<void>;
  addCurso: (curso: ICurso, user: IUser, certificado: string) => Promise<void>;
  removeCurso: (curso: ICurso, user: IUser) => Promise<void>;
  registerCurso: (token: string, curso: string, validade: number) => Promise<boolean | void>;
  editCurso: (
    token: string,
    curso: string,
    id: number,
    validade: number
  ) => Promise<boolean | void>;
  deleteCurso: (token: string, id: number) => Promise<boolean | void>;
}
