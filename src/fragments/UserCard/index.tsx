'use client'

import { userStore } from "@/stores/userStore";
import { UserIcon } from "../UserIcon"
import { StyledDiv } from "./style";


export const UserCard = () => {
    const user = userStore((state) => state.userData?.user);

    return (
        <StyledDiv>
            <UserIcon />
            <p>{user?.nome}</p>
        </StyledDiv>
    )
}