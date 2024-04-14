import { create } from "zustand";
import {
  IRegistroDePonto,
  IRegistroDePontoState,
} from "./@registroDePontoTypes";
import { api } from "@/app/api";
import { adminStore } from "./adminStore";
import { isSameDay, setTimeTo } from "@/utils/operations";

const setError = adminStore.getState().setError;
const setMessage = adminStore.getState().setMessage;
const adminActiveUser = adminStore.getState().adminActiveUser;
const setAdminActiveUser = adminStore.getState().setAdminActiveUser;

export const registroStore = create<IRegistroDePontoState>()((set, get) => ({
  pontoList: [],
  loading: false,
  indicadorMenu: 'semanal',
  setIndicadorMenu: (option) => {
    set({ indicadorMenu: option });
  },
  setLoading: (boolean) => {
    set({ loading: boolean });
  },

  loadPontos: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get<IRegistroDePonto[]>("/registro-de-ponto/");
      set({ pontoList: data });
    } catch (error) {
      console.log(error);
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
      set({ loading: true });
      const entrada = new Date(pontoData.entrada);
      const saida = new Date(pontoData.saida);
    
    const diffInMilliseconds = Math.abs(saida.getTime() - entrada.getTime());
    
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    
    if (diffInMinutes <= 5) {
      throw new Error("Ponto Anulado: Menor ou igual a 5 minutos.");
    }

      if (entrada > saida) {
        throw new Error("Entrada maior que a saida");
      }
      const userPontos = get().pontoList.filter((ponto) => ponto.user === userId);
      if (
        userPontos.some(
          (ponto) =>
            new Date(ponto.entrada).getTime() === entrada.getTime() ||
            new Date(ponto.saida).getTime() === saida.getTime()
        )
      ) {
        throw new Error("Ponto duplicado");
      }

      if (isSameDay(pontoData.entrada, pontoData.saida)) {
        const { data } = await api.post<IRegistroDePonto>(
          `/registro-de-ponto/user/${userId}/`,
          {
            ...pontoData,
          }
        );
        set((state) => {
          const pontoList = state.pontoList;
          return {
            pontoList: [...pontoList, data],
          };
        });
        setMessage("Ponto Registrado com sucesso!");
        return data;
      } else {
        const firstEntrada = pontoData.entrada;
        const firstSaida = setTimeTo(pontoData.entrada, '23:59:59');
        const secondEntrada = setTimeTo(pontoData.saida, '00:00:00');
        const secondSaida = pontoData.saida;
        //primeira requisição
        const firstPonto = await api.post<IRegistroDePonto>(
          `/registro-de-ponto/user/${userId}/`,
          {
            entrada: firstEntrada,
            saida: firstSaida
          }
        );
        set((state) => {
          const pontoList = state.pontoList;
          return {
            pontoList: [...pontoList, firstPonto.data],
          };
        });
        //segunda requisição
        const secondPonto = await api.post<IRegistroDePonto>(
          `/registro-de-ponto/user/${userId}/`,
          {
            entrada: secondEntrada,
            saida: secondSaida
          }
        );
        set((state) => {
          const pontoList = state.pontoList;
          return {
            pontoList: [...pontoList, secondPonto.data],
          };
        });
        setMessage("Ponto Registrado com sucesso!");
        return true;
      }
      
    } catch (error: any) {
      console.log(error.message);
      console.log(error);
      setError(`Falha no registro do ponto ${error.message}`);
      return false;
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },

  deletePonto: async (id, token) => {
    try {
      await api.delete<IRegistroDePonto>(`/registro-de-ponto/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        pontoList: state.pontoList.filter((ponto) => ponto.id !== id),
      }));
      if (adminActiveUser) {
        const newUser = {
          ...adminActiveUser,
          registros_de_ponto: adminActiveUser.registros_de_ponto.filter(
            (ponto) => ponto.id !== id
          ),
        };
        setAdminActiveUser(newUser);
      }
      setMessage("Ponto Removido com sucesso!");
      return true;
    } catch (error) {
      console.log(error);
      setError(`Falha ao remover ponto`);
      return false;
    } finally {
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    };
  },
}));
