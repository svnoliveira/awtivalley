'use client'
import { userStore } from "@/stores/userStore"
import Link from "next/link"
import { useEffect } from "react";

export const Header = () => {
    const user = userStore((state) => state.userData?.user);
    const logout = userStore((state) => state.logoutUser);
    const loadUser = userStore((state) => state.loadUser);

    useEffect(() => {
        const initiate = async () => {
            await loadUser();
        };
        initiate();
    }, []);

    return (
        <header>
            <nav>
                <ul>
                    {user?.is_superuser && <li><Link href={"/admin"}>Admin</Link></li>}
                    {user && <li><Link href={"/dashboard"}>Área do colaborador</Link></li>}
                    {user && <li><Link href={"/indicadores"}>Indicadores</Link></li>}
                    {user && <li><Link href={"/registro-de-ponto"}>Registro de Ponto</Link></li>}
                    {user && <li onClick={() => logout()}>Logout</li>}
                    {!user && <li><Link href={"/login"}>Login</Link></li>}
                    {!user && <li><Link href={"/register"}>Cadastrar</Link></li>}
                </ul>
            </nav>
        </header>
    )
}