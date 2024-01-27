import { create } from "zustand";
import { IAdminState } from "./@adminTypes";

export const adminStore = create<IAdminState>()((set) => ({
    activeAdminScreen: "",
    adminAddModal: false,
    adminEditModal:false,
    adminDeleteModal: false,
    sideMenuToggle: false,
    adminActiveUser: null,
    adminActiveEspecialidade: null,
    adminActiveCurso: null,
    adminActivePeriod: null,
    message: "",
    error: "",

    setActiveAdminScreen: (clicked) => { set({ activeAdminScreen: clicked })},
    setAdminAddModal: (boolean) => { set({ adminAddModal: boolean })},
    setAdminEditModal: (boolean) => { set({ adminEditModal: boolean })},
    setAdminDeleteModal: (boolean) => { set({ adminDeleteModal: boolean })},
    setSideMenuToggle: (boolean) => { set({ sideMenuToggle: boolean })},
    setAdminActiveUser: (user) => { set({ adminActiveUser: user })},
    setAdminActiveEspecialidade: (especialidade) => { set({ adminActiveEspecialidade: especialidade })},
    setAdminActiveCurso: (curso) => { set({ adminActiveCurso: curso })},
    setAdminActivePeriod: (period) => {set ({adminActivePeriod: period})},
    setError: (string) => { set({ message: string })},
    setMessage: (string) => { set({ message: string })},
}));