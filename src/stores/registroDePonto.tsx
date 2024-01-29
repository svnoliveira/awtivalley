import { create } from "zustand";
import { IRegistroDePonto, IRegistroDePontoState } from "./@registroDePontoTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";


const setError = adminStore.getState().setError
const setMessage = adminStore.getState().setMessage

export const registroStore = create<IRegistroDePontoState>()((set) => ({
    pontoList: [],
    loading: false,
    indicadorMenu: "semanal",
    setIndicadorMenu: (option) => {set({indicadorMenu: option})},
    setLoading: (boolean) => {
        set({ loading: boolean })
    },

    loadPontos: async () => {
        try {
            set({ loading: true });
            const { data } = await api.get<IRegistroDePonto[]>("/registro-de-ponto/");
            set({ pontoList: data });
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false });
            setTimeout(() => {
                setError("");
                setMessage("");
            }, 2000);
        }
    },
    addPonto: async (pontoData, userId) => {
        try {
            set({loading: true});
            const entrada = new Date(pontoData.entrada);
            const saida = new Date(pontoData.saida);
            if (entrada > saida){
                throw new Error("Entrada maior que a saida");
            }
            const { data } = await api.post<IRegistroDePonto>(`/registro-de-ponto/user/${userId}/`, {
                ...pontoData
            });
            set((state) => {
                const pontoList = state.pontoList
                return {
                    pontoList: [...pontoList, data]
                }
            })
            setMessage("Ponto Registrado com sucesso!");
            return data;
        } catch (error) {
            console.log(error)
            setError("Falha no registro do ponto");
            return false;
        } finally {
            set({ loading: false });
            setTimeout(() => {
                setError("");
                setMessage("");
            }, 2000);
        }
    },
}))