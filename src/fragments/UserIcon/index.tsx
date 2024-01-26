'use client'

import { userStore } from "@/stores/userStore";

export const UserIcon = () => {
    const user = userStore((state) => state.userData?.user);
    return(
        <div>{user && <div>{user.nome.charAt(0)}</div>}</div>
    )
}