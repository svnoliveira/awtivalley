'use client'
import Image from "next/image";
import React from "react";
import { StyledDiv, StyledP } from "./style";

interface IDashboardIngressoCardsProps{
    iconUrl: string;
    children: React.ReactNode
}

export const DashboardIngressoCards = ({iconUrl, children}:IDashboardIngressoCardsProps) => {
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