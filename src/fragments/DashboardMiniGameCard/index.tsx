'use client'
import Image from "next/image";
import React from "react";
import { StyledDiv, StyledP } from "./style";

interface IDashboardMiniGameCardProps{
    iconUrl: string;
    children: React.ReactNode
}

export const DashboardMiniGameCard = ({iconUrl, children}:IDashboardMiniGameCardProps) => {
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