import { IEspecialidade } from "./@especialidadeTypes"
import { IUser } from "./@userTypes"

export interface IAdminState {
    activeAdminScreen: string | null
    adminAddModal: boolean
    adminEditModal: boolean
    adminDeleteModal: boolean
    sideMenuToggle: boolean
    adminActiveUser: IUser | null
    adminActiveEspecialidade: IEspecialidade| null
    message: string
    error: any

    setActiveAdminScreen: (clicked: ("bonus" | "funcionarios" | "pontos" | "cursos" | "especialidades")) => void;
    setAdminAddModal: (boolean: boolean) => void
    setAdminEditModal: (boolean: boolean) => void
    setAdminDeleteModal: (boolean: boolean) => void
    setSideMenuToggle: (boolean: boolean) => void
    setAdminActiveUser: (user: IUser | null) => void
    setAdminActiveEspecialidade: (especialidade: IEspecialidade | null) => void
    setError: (string: string) => void
    setMessage: (string: string) => void
}
