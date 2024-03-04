import { create } from "zustand";
import { IUser, IUserState, TToken } from "./@userTypes";
import { api } from "@/app/api";
import { jwtDecode } from "jwt-decode";
import { adminStore } from "./adminStore";

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
          const webhookUrl = 'https://discord.com/api/webhooks/1198048319147081828/92dfDbbV89xAX72hIsEEbZe_IODYzNDtvFmaAJ0ml_wW7MobVelH-tc30o_xUWN4bJ4n';
          const mensagem = `:mega: Login feito com sucesso por :busts_in_silhouette: **${user?.nome}** | ":identification_card: **${user?.id}** às **${horaBrasilia}**`;

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
}));
