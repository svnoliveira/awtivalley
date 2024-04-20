import { ICurso } from "./@cursoTypes"
import { IEspecialidade } from "./@especialidadeTypes"
import { IExame } from "./@exameTypes"
import { IUser } from "./@userTypes"

export type IPeriod = {
    start: Date
    end: Date
}

export interface IAdminState {
    activeAdminScreen: string | null
    adminAddModal: boolean
    adminEditModal: boolean
    adminDeleteModal: boolean
    sideMenuToggle: boolean
    adminActiveUser: IUser | null
    adminActiveEspecialidade: IEspecialidade| null
    adminActiveCurso: ICurso| null
    adminActivePeriod: IPeriod | null
    adminActiveExame: IExame | null
    message: string
    error: any

    setActiveAdminScreen: (clicked: ("bonus" | "funcionarios" | "pontos" | "cursos" | "exames" | "especialidades")) => void;
    setAdminAddModal: (boolean: boolean) => void
    setAdminEditModal: (boolean: boolean) => void
    setAdminDeleteModal: (boolean: boolean) => void
    setSideMenuToggle: (boolean: boolean) => void
    setAdminActiveUser: (user: IUser | null) => void
    setAdminActiveEspecialidade: (especialidade: IEspecialidade | null) => void
    setAdminActiveCurso: (curso: ICurso | null) => void
    setAdminActivePeriod: (period: IPeriod | null) => void
    setAdminActiveExame: (exame: IExame | null) => void
    setError: (string: string) => void
    setMessage: (string: string) => void
}
