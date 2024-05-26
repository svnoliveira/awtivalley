import styled from "styled-components";

export const StyledSection = styled.section`
    min-height: 70dvh;
`
export const StyledContainer = styled.div`
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
`

export const StyledList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(20px, calc(100vw - 190px), 60px);
    min-height: 70dvh;
    margin: 30px 0;
`