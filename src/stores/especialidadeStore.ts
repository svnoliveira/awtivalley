import { create } from "zustand";
import { IEspecialidade, IEspecialidadeState } from "./@especialidadeTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";

const setError = adminStore.getState().setError
const setMessage = adminStore.getState().setMessage
const setAdminActiveEspecialidade = adminStore.getState().setAdminActiveEspecialidade

export const especialidadeStore = create<IEspecialidadeState>()((set) => ({
  especialidadeList: [],
  loading: false,

  setLoading: (boolean) => {
    set({ loading: boolean })
  },
  setEspecialidadeList: (list) => { set({ especialidadeList: list }) },
  loadEspecialidades: async () => {
    if (typeof window !== "undefined") {
      try {
        set({ loading: true });
        const token = localStorage.getItem("@awti:token");
        const { data } = await api.get<IEspecialidade[]>('/especialidades/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        set({ especialidadeList: data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ loading: false });
      }
    }
  },
  addEspecialidade: async (especialidade, user) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<IEspecialidade>(
        `/especialidades/vincular/${especialidade.id}/${user.id}/`
      );
      setAdminActiveEspecialidade(data)
      setMessage('Especialidade Vinculada com sucesso');
    } catch (error) {
      setError("Falha ao vincular especialidade");
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    };
  },
  removeEspecialidade: async (especialidade, user) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("@awti:token");
      await api.patch<IEspecialidade>(
        `/users/especialidades/desvincular/${user.id}/${especialidade.id}/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      const updatedEspecialidade:IEspecialidade = {
        ...especialidade,
        users: especialidade.users.filter((id) => user.id !== id)}
      setAdminActiveEspecialidade(updatedEspecialidade);
      setMessage('Especialidade Removida com sucesso');
    } catch (error) {
      setError("Falha ao remover especialidade");
      console.log(error)
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    };
  },
}))