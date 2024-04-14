import { create } from "zustand";
import { ICurso, ICursoState } from "./@cursoTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";
import { IUserCurso } from "./@userTypes";


const setError = adminStore.getState().setError;
const setMessage = adminStore.getState().setMessage;
const setAdminActiveCurso = adminStore.getState().setAdminActiveCurso;
const setActiveUser = adminStore.getState().setAdminActiveUser;

export const cursoStore = create<ICursoState>()((set, get) => ({
  cursoList: [],
  loading: false,

  setLoading: (boolean) => {
    set({ loading: boolean });
  },
  setCursoList: (list) => {
    set({ cursoList: list });
  },
  loadCursos: async () => {
    if (typeof window !== "undefined") {
      try {
        set({ loading: true });
        const token = localStorage.getItem("@awti:token");
        const { data } = await api.get<ICurso[]>("/cursos/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set({ cursoList: data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ loading: false });
      }
    }
  },
  addCurso: async (curso, user, certificado) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<IUserCurso>(
        `/cursos/vincular/${curso.id}/${user.id}/`, {certificado: certificado}
      );
      const activeCurso = get().cursoList.find((entry) => entry.nome === data.nome);
      if (activeCurso) {
        setAdminActiveCurso({...activeCurso, users: [
          ...activeCurso.users, user.id
        ]});
        setActiveUser({...user, cursos: [...user.cursos, data]});
        set((state) => ({cursoList: state.cursoList.map((entry) => {
          if(entry.id === curso.id){
            if (!entry.users.some((userID) => userID === user.id)){
              return {...entry, users: [...entry.users, user.id]}
            }
          }
          return entry;
        })}));
      } else {
        throw new Error('Erro ao encontrar curso');
      }
      setMessage("Curso Vinculada com sucesso");
    } catch (error) {
      setError("Falha ao vincular curso");
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },
  removeCurso: async (curso, user) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("@awti:token");
      await api.patch<ICurso>(
        `/users/cursos/desvincular/${user.id}/${curso.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCurso: ICurso = {
        ...curso,
        users: curso.users.filter((id) => user.id !== id),
      };
      setAdminActiveCurso(updatedCurso);
      setMessage("Curso Removida com sucesso");
    } catch (error) {
      setError("Falha ao remover curso");
      console.log(error);
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },

  registerCurso: async (token, curso, validade) => {
    try {
      set({ loading: true });
      const { data } = await api.post<ICurso>(
        "/cursos/",
        { nome: curso, validade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ cursoList: [...state.cursoList, data] }));
      setMessage("Curso criado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao criar curso");
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
  editCurso: async (token, curso, id, validade) => {
    try {
      set({ loading: true });
      let formData;
      if (curso === '') {
        formData = {
          validade
        }
      } else {
        formData = {
          nome: curso,
          validade
        }
      }
      const { data } = await api.patch<ICurso>(
        `/cursos/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        cursoList: state.cursoList.map((oldCurso) => {
          if (oldCurso.id === id) {
            return data;
          }
          return oldCurso;
        }),
      }));
      setMessage("Curso renomeado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao renomear curso");
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
  deleteCurso: async (token, id) => {
    try {
      set({ loading: true });
      await api.delete<ICurso>(`/cursos/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        cursoList: state.cursoList.filter((oldCurso) => oldCurso.id !== id),
      }));
      setMessage("Curso deletado com sucesso");
      return true;
    } catch (error) {
      setError("Falha ao deletar curso");
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
