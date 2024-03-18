import styled from "styled-components"

export const StyledX = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 19px;
`

export const StyledModal = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.5);
    z-index: 10;
    form {
        position: relative;
        width: min(20rem, 95%);
        background-color: white;
        padding: 1rem;
        margin: 15% auto 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }
`