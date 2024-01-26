export interface IAdminState {
    activeAdminList: string | null
    adminAddModal: boolean
    adminEditModal: boolean
    adminDeleteModal: boolean
    sideMenuToggle: boolean
    message: string
    error: any

    setActiveAdminlist: (list: ("all" | "sale" | "category" | "collections" | "stock" | "add")) => void;
    setAdminAddModal: (boolean: boolean) => void
    setAdminEditModal: (boolean: boolean) => void
    setAdminDeleteModal: (boolean: boolean) => void
    setSideMenuToggle: (boolean: boolean) => void
    setError: (string: string) => void
    setMessage: (string: any) => void
}
