'use client'

import { adminStore } from "@/stores/adminStore";

export const AdminSelectedUserCard = () => {
    const user = adminStore((state) => state.adminActiveUser);
    const clearUser = adminStore((state) => state.setAdminActiveUser);

    return (
        <>
        <li onClick={() => clearUser(null)}>
            <p>Usuário Selecionado</p>
            <p>{user && user.nome}</p>
        </li>
        </>
    )
}