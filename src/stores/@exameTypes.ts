import { IUser } from "./@userTypes";

export interface IExame {
  id: number;
  nome: string;
  users: number[]; //user_id list
  validade: number
}

export interface IExameState {
  exameList: IExame[];
  loading: boolean;

  setExameList: (list: IExame[]) => void;
  setLoading: (boolean: boolean) => void;
  loadExames: () => Promise<void>;
  addExame: (exame: IExame, user: IUser, docExame: string) => Promise<void>;
  removeExame: (exame: IExame, user: IUser) => Promise<void>;
  registerExame: (token: string, exame: string, validade: number) => Promise<boolean | void>;
  editExame: (
    token: string,
    exame: string,
    id: number,
    validade: number
  ) => Promise<boolean | void>;
  deleteExame: (token: string, id: number) => Promise<boolean | void>;
}
