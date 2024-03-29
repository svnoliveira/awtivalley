import { ICurso } from "./@cursoTypes"
import { IEspecialidade } from "./@especialidadeTypes"
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
    message: string
    error: any

    setActiveAdminScreen: (clicked: ("bonus" | "funcionarios" | "pontos" | "cursos" | "especialidades")) => void;
    setAdminAddModal: (boolean: boolean) => void
    setAdminEditModal: (boolean: boolean) => void
    setAdminDeleteModal: (boolean: boolean) => void
    setSideMenuToggle: (boolean: boolean) => void
    setAdminActiveUser: (user: IUser | null) => void
    setAdminActiveEspecialidade: (especialidade: IEspecialidade | null) => void
    setAdminActiveCurso: (curso: ICurso | null) => void
    setAdminActivePeriod: (period: IPeriod | null) => void
    setError: (string: string) => void
    setMessage: (string: string) => void
}
