import { create } from "zustand";
import { IExame, IExameState } from "./@exameTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";
import { IUserExame } from "./@userTypes";

const setError = adminStore.getState().setError;
const setMessage = adminStore.getState().setMessage;
const setAdminActiveExame = adminStore.getState().setAdminActiveExame;
const setActiveUser = adminStore.getState().setAdminActiveUser;

export const exameStore = create<IExameState>()((set, get) => ({
  exameList: [],
  loading: false,

  setLoading: (boolean) => {
    set({ loading: boolean });
  },
  setExameList: (list) => {
    set({ exameList: list });
  },
  loadExames: async () => {
    if (typeof window !== "undefined") {
      try {
        set({ loading: true });
        const token = localStorage.getItem("@awti:token");
        const { data } = await api.get<IExame[]>("/exames/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set({ exameList: data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ loading: false });
      }
    }
  },
  addExame: async (exame, user, docExame) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<IUserExame>(
        `/exames/vincular/${exame.id}/${user.id}/`, {docExame: docExame}
      );
      const activeExame = get().exameList.find((entry) => entry.nome === data.nome);
      if (activeExame) {
        setAdminActiveExame({...activeExame, users: [
          ...activeExame.users, user.id
        ]});
        setActiveUser({...user, exames: [...user.exames, data]});
        set((state) => ({exameList: state.exameList.map((entry) => {
          if(entry.id === exame.id){
            if (!entry.users.some((userID) => userID === user.id)){
              return {...entry, users: [...entry.users, user.id]}
            }
          }
          return entry;
        })}));
      } else {
        throw new Error('Erro ao encontrar exame');
      }
      setMessage("Exame Vinculada com sucesso");
    } catch (error) {
      setError("Falha ao vincular exame");
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },
  removeExame: async (exame, user) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("@awti:token");
      await api.patch<IExame>(
        `/users/exames/desvincular/${user.id}/${exame.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedExame: IExame = {
        ...exame,
        users: exame.users.filter((id) => user.id !== id),
      };
      setAdminActiveExame(updatedExame);
      setMessage("Exame Removida com sucesso");
    } catch (error) {
      setError("Falha ao remover exame");
      console.log(error);
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },

  registerExame: async (token, exame, validade) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IExame>(
        "/exames/",
        { nome: exame, validade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ exameList: [...state.exameList, data] }));
      setMessage("Exame criado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao criar exame");
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
  editExame: async (token, exame, id, validade) => {
    try {
      set({ loading: true });
      let formData;
      if (exame === '') {
        formData = {
          validade
        }
      } else {
        formData = {
          nome: exame,
          validade
        }
      }
      const { data } = await api.patch<IExame>(
        `/exames/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        exameList: state.exameList.map((oldExame) => {
          if (oldExame.id === id) {
            return data;
          }
          return oldExame;
        }),
      }));
      setMessage("Exame renomeado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao renomear exame");
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
  deleteExame: async (token, id) => {
    try {
      set({ loading: true });
      await api.delete<IExame>(`/exames/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        exameList: state.exameList.filter((oldExame) => oldExame.id !== id),
      }));
      setMessage("Exame deletado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao deletar exame");
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
}));
