'use client'

import { userStore } from "@/stores/userStore";
import { StyledDiv } from "./style";

export const UserIcon = () => {
    const user = userStore((state) => state.userData?.user);
    return(
        <StyledDiv>{user && <span>{user.nome.charAt(0)}</span>}</StyledDiv>
    )
}