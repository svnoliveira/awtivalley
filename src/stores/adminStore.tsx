import { create } from "zustand";
import { IAdminState } from "./@adminTypes";

export const adminStore = create<IAdminState>()((set) => ({
    activeAdminScreen: "default",
    adminAddModal: false,
    adminEditModal:false,
    adminDeleteModal: false,
    sideMenuToggle: false,
    adminActiveUser: null,
    message: "",
    error: "",

    setActiveAdminScreen: (clicked) => { set({ activeAdminScreen: clicked })},
    setAdminAddModal: (boolean) => { set({ adminAddModal: boolean })},
    setAdminEditModal: (boolean) => { set({ adminEditModal: boolean })},
    setAdminDeleteModal: (boolean) => { set({ adminDeleteModal: boolean })},
    setSideMenuToggle: (boolean) => { set({ sideMenuToggle: boolean })},
    setAdminActiveUser: (user) => { set({ adminActiveUser: user })},
    setError: (string) => { set({ message: string })},
    setMessage: (string) => { set({ message: string })},
}));