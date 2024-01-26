'use client'

import { userStore } from "@/stores/userStore";
import { UserIcon } from "../UserIcon"

export const UserCard = () => {
    const user = userStore((state) => state.userData?.user);

    return (
        <div>
            <UserIcon />
            <p>{user?.nome}</p>
        </div>
    )
}