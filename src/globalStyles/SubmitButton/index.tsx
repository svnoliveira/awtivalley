import styled, { css } from "styled-components";

export const StyledSubmitButton = styled.button<{$error: boolean}>`
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px;
    ${({$error}) => {
        if ($error){
            return css`
                color: var(--grey);
                background-color: #EEEEEE;
            `
        } else {
            return css`
                color: white;
                background-color: var(--red);
                transition: 0.4s ease-in-out;
                &:hover{
                    background-color: var(--dark-red);
                }
            `
        }
    }}
`