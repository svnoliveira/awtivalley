'use client'
import Image from "next/image";
import React from "react";
import { StyledDiv, StyledP } from "./style";

interface IHomeMenuCardProps{
    iconUrl: string;
    children: React.ReactNode
}

export const HomeMenuCard = ({iconUrl, children}:IHomeMenuCardProps) => {
    return (
        <StyledDiv>
            <Image
                alt="Menu Icon"
                src={iconUrl}
                height={240}
                width={240}
                />
            <StyledP>{children}</StyledP>
        </StyledDiv>
    )
}