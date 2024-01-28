import styled from "styled-components";

export const StyledDiv = styled.div`
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;

    > p {
        font-size: 22px;
        @media (max-width: 670px) {
        display: none;
        }
    }
`