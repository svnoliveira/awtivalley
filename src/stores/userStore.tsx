import { create } from 'zustand'
import { IUser, IUserData, IUserState, TToken } from './@userTypes'
import { api } from '@/app/api';
import { jwtDecode } from 'jwt-decode';
import { adminStore } from './adminStore';


const setError = adminStore.getState().setError
const setMessage = adminStore.getState().setMessage

export const userStore = create<IUserState>()((set, get) => ({
    userData: null,
    loading: false,

    setLoading: (boolean) => {
        set({loading: boolean})
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
            localStorage.setItem("@awti:token", JSON.stringify(token));
            const decoded: any = jwtDecode(token)
            const userID: number = decoded.user_id
            const user = await api.get<IUser>(`/users/${userID}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const new_userData = {
                accessToken: token,
                user: user.data
            }

            set({ userData: new_userData });
            setMessage("Login feito com sucesso!");
            return true
        } catch (error) {
            console.log(error);
            setError("Tentativa de login falhou");
        } finally {
            set({ loading: false });
            setTimeout(() => { 
                setError("");
                setMessage(""); 
            }, 2000);
        };
    },

    loadUser: async () => {
        if (typeof window !== "undefined") {
            try {
                set({loading: true})
                let token = localStorage.getItem("@awti:token");
                if (token) {
                    token = JSON.parse(token) as string
                    const decoded: any = jwtDecode(token)
                    const userID: number = decoded.user_id
                    const user = await api.get<IUser>(`/users/${userID}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const new_userData = {
                        accessToken: token,
                        user: user.data
                    }
                    set({ userData: new_userData });
                }
            } catch (error) {
                console.log(error)
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
            const { data } = await api.post<IUser>("/users/", userData);
            setMessage("Usuário registrado com sucesso!" );
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
        };
    },
}))