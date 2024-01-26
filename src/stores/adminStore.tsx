import { create } from "zustand";
import { IAdminState } from "./@adminTypes";

export const adminStore = create<IAdminState>()((set) => ({
    activeAdminList: "all",
    adminAddModal: false,
    adminEditModal:false,
    adminDeleteModal: false,
    sideMenuToggle: false,
    message: "",
    error: "",

    setActiveAdminlist: (listName) => { set({ activeAdminList: listName })},
    setAdminAddModal: (boolean) => { set({ adminAddModal: boolean })},
    setAdminEditModal: (boolean) => { set({ adminEditModal: boolean })},
    setAdminDeleteModal: (boolean) => { set({ adminDeleteModal: boolean })},
    setSideMenuToggle: (boolean) => { set({ sideMenuToggle: boolean })},
    setError: (string) => { set({ message: string })},
    setMessage: (string) => { set({ message: string })},
}));