import styled from "styled-components";

export const StyledDiv = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: #EEEEEE;
    border-radius: 12px;
    gap: 15px;
    transition: 0.4s ease-in-out;

    >img{
        height: clamp(70px, calc(100vw - 190px), 210px);
        width: clamp(70px, calc(100vw - 190px), 210px);
        object-fit: contain;
    }

    &:hover{
        background-color: #DADADA;
        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    }
`

export const StyledP = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: var(--grey);
`