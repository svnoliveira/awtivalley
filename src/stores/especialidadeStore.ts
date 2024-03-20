import { create } from "zustand";
import { IEspecialidade, IEspecialidadeState } from "./@especialidadeTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";
import { userStore } from "./userStore";

const setError = adminStore.getState().setError
const setMessage = adminStore.getState().setMessage
const setAdminActiveEspecialidade = adminStore.getState().setAdminActiveEspecialidade
const logout = userStore.getState().logoutUser

export const especialidadeStore = create<IEspecialidadeState>()((set, get) => ({
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
        logout();
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

  registerEspecialidade: async (token, especialidade) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IEspecialidade>(
        "/especialidades/",
        { nome: especialidade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ especialidadeList: [...state.especialidadeList, data] }));
      setMessage("Especialidade criado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao criar especialidade");
      console.log(error);
      return false;
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },
  editEspecialidade: async (token, especialidade, id) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<IEspecialidade>(
        `/especialidades/${id}/`,
        { nome: especialidade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        especialidadeList: state.especialidadeList.map((oldEspecialidade) => {
          if (oldEspecialidade.id === id) {
            return data;
          }
          return oldEspecialidade;
        }),
      }));
      setMessage("Especialidade renomeado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao renomear especialidade");
      console.log(error);
      return false;
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },
  deleteEspecialidade: async (token, id) => {
    try {
      set({ loading: true });
      await api.delete<IEspecialidade>(`/especialidades/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        especialidadeList: state.especialidadeList.filter((oldEspecialidade) => oldEspecialidade.id !== id),
      }));
      setMessage("Especialidade deletado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao deletar especialidade");
      console.log(error);
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