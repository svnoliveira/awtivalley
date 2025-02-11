import { create } from "zustand";
import { ILicencaMedica, IUser, IUserState, TToken } from "./@userTypes";
import { api } from "@/app/api";
import { jwtDecode } from "jwt-decode";
import { adminStore } from "./adminStore";
import { AxiosError } from "axios";

const setError = adminStore.getState().setError;
const setMessage = adminStore.getState().setMessage;
const { DateTime } = require('luxon');

export const userStore = create<IUserState>()((set, get) => ({
  userData: null,
  userList: [],
  loading: false,

  setLoading: (boolean) => {
    set({ loading: boolean });
  },

  logoutUser: () => {
    localStorage.removeItem("@awti:token");
    set({ userData: null });
  },

  loginUser: async ({ username, password }) => {
    try {
      set({ loading: true });
      const { data } = await api.post<TToken>("/login/", {
        username: username,
        password: password,
      });
  
      const token = data.access;
      const decoded: any = jwtDecode(token);
      const userID: number = decoded.user_id;
      const user = get().userList.find((userInfo) => userInfo.id === userID);
      if (user) {
        if (!user.ativo) {
          throw new Error("Usuário desativado");
        }
        localStorage.setItem("@awti:token", token);
        const new_userData = {
          accessToken: token,
          user: user,
        };
        set({ userData: new_userData });
  
          // Adicione a hora de Brasília à mensagem
          const horaBrasilia = DateTime.local().setZone('America/Sao_Paulo').toLocaleString(DateTime.TIME_24_SIMPLE) + ' ' + DateTime.local().setZone('America/Sao_Paulo').toFormat('dd/MM/yyyy');

          // Envie a mensagem para o Discord aqui
          const webhookUrl = 'https://discord.com/api/webhooks/1335732036887117965/lyRw60qgWTBYMHTpgXNTIe5rfKlu8xqvKIlm3l-r006_5eDV5iPl8Ac6HyObZKAzR_ut';
          const mensagem = `:mega: O Colaborador :busts_in_silhouette: **${user?.nome}** | :identification_card: **${username}** ID de cadastro: **${user?.id}**, entrou no painel, :alarm_clock: às **${horaBrasilia}**`;

          fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: mensagem,
            }),
          })
          .then(response => console.log('Mensagem enviada com sucesso para o Discord'))
          .catch(error => console.error('Erro ao enviar a mensagem para o Discord:', error));
            
        setMessage("Login feito com sucesso!");
        return true;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      console.log(error);
      setError(
        error.message === "Usuário desativado"
          ? "Usuário desativado"
          : "Tentativa de login falhou"
      );
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },
  

  loadUser: async () => {
    if (typeof window !== "undefined") {
      try {
        set({ loading: true });
        const userList = (await api.get<IUser[]>("/users/")).data;
        set({ userList: userList });
        let token = localStorage.getItem("@awti:token");
        if (token) {
          token = token as string;
          const decoded: any = jwtDecode(token);
          const userID: number = decoded.user_id;
          const user = get().userList.find(
            (userInfo) => userInfo.id === userID
          );
          if (user) {
            if (!user.ativo) {
              throw new Error("Usuário desativado");
            }
            const new_userData = {
              accessToken: token,
              user: user,
            };
            set({ userData: new_userData });
          } else {
            throw new Error();
          }
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@awti:token");
        set({ userData: null });
      } finally {
        set({ loading: false });
        setTimeout(() => {
          setError("");
          setMessage("");
        }, 2000);
      }
    }
  },

  registerUser: async (userData) => {
    try {
      set({ loading: true });
      await api.post<IUser>("/users/", userData);
      setMessage("Usuário registrado com sucesso!");
      return true;
    } catch (error) {
      console.log(error);
      setError("Tentativa de registro falhou");
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },

  changePassword: async (token, user, senha) => {
    try {
      set({ loading: true});
      await api.patch<IUser>(`/users/${user.id}/`, {senha}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Senha alterada com sucesso!");
      return true;
    } catch (error) {
      console.log(error);
      setError("Alteração falhou");
      return false;
    } finally {
      set({ loading: false });
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  },

  editUser: async (token, id, userData) => {
    try {
      const licenca_medica: ILicencaMedica = {};
      if ("ciclo" in userData) {
        licenca_medica.ciclo = userData.ciclo;
        delete userData.ciclo;
      }
      if ("data" in userData) {
        licenca_medica.data = userData.data;
        delete userData.data;
      }
      if ("responsavel" in userData) {
        licenca_medica.responsavel = userData.responsavel;
        delete userData.responsavel;
      }
      if ("crm" in userData) {
        licenca_medica.crm = userData.crm;
        delete userData.crm;
      }

      const { data } = await api.patch<IUser>(`/users/${id}/`, {
        ...userData, ativo: userData.ativo === "true" ? true : false,
        licenca_medica: {...licenca_medica}
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data) {
        set((state) => ({userList : state.userList.map((user) => {
          if (user.id === id){
            return data;
          } else {
            return user;
          }
        })}) );
        setMessage("Usuário alterado com sucesso!");
        return true;
      };
    } catch (error) {
      console.log(error);
      setError("Alteração falhou");
      return false;
    } finally {
      setTimeout(() => {
        setError("");
        setMessage("");
      }, 2000);
    }
  }
}));
