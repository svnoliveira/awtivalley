import { TEditUserValues } from "@/components/AdminUserModal/schema";
import { ICurso } from "./@cursoTypes";
import { IEspecialidade } from "./@especialidadeTypes";
import { IRegistroDePonto } from "./@registroDePontoTypes";

export type TToken = {
    refresh: string;
    access: string;
}

export interface IUserCreate{
	nome: string,
    passaporte: string,
	senha: string,
	discord_id: string,
	is_superuser?: boolean
    licenca_medica: ILicencaMedica
}

export interface IUser{
    id: number;
    is_superuser: boolean;
    passaporte: string;
    nome: string;
    discord_id: string;
    cargo: string;
    efetivacao: string;
    funcao: string;
    setor: string;
    ultima_promocao: string;
    observacoes: string;
    funcoes_extra: string;
    ativo: boolean
    licenca_medica: ILicencaMedica;
    cursos: IUserCurso[];
    especialidades: IEspecialidade[];
    registros_de_ponto: IRegistroDePonto[];
};

export interface ILicencaMedica{
    ciclo?: string;
    data?: string;
    responsavel?: string;
    crm?: string;
}

export interface IUserData{
    accessToken: string;
    user: IUser;
};

export interface IUserCurso{
    nome: string,
	inicio: string | null,
	vencimento: string | null,
	certificado: string
}

export interface IUserState {
    userData: IUserData | null;
    userList: IUser[];
    loading: boolean
    setLoading: (boolean: boolean) => void
    logoutUser: () => void
    loginUser: ({ username, password }: {
        username: string;
        password: string;
    }) => Promise<true | undefined>
    loadUser: () => Promise<void>
    registerUser: (userData:IUserCreate) => Promise<boolean | undefined>
    changePassword: (token:string, user:IUser, senha:string) => Promise<boolean | undefined>
    editUser: (token:string, id:number, userData:TEditUserValues) => Promise<boolean | undefined>
}