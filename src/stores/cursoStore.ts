import { create } from "zustand";
import { ICurso, ICursoState } from "./@cursoTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";


const setError = adminStore.getState().setError;
const setMessage = adminStore.getState().setMessage;
const setAdminActiveCurso = adminStore.getState().setAdminActiveCurso;

export const cursoStore = create<ICursoState>()((set) => ({
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
  addCurso: async (curso, user) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<ICurso>(
        `/cursos/vincular/${curso.id}/${user.id}/`
      );
      setAdminActiveCurso(data);
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

  registerCurso: async (token, curso) => {
    try {
      set({ loading: true });
      const { data } = await api.post<ICurso>(
        "/cursos/",
        { nome: curso },
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
  editCurso: async (token, curso, id) => {
    try {
      set({ loading: true });
      const { data } = await api.patch<ICurso>(
        `/cursos/${id}/`,
        { nome: curso },
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
