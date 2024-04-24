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

export const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 15px;
    >button {
        padding: 5px 10px;
        color: white;
        background-color: var(--dark-red);
        border-radius: 3px;

        &:hover {
            background-color: var(--red);
        }
    }
    form {
        h1 {
            font-weight: 700;
        }
        input,
        select {
            padding: 5px 10px;
        }
    }
`

export const StyledButton = styled.button`
    padding: 5px 10px;
        color: white;
        background-color: var(--dark-red);
        border-radius: 3px;

        &:hover {
            background-color: var(--red);
        }
`

export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    > * {
        flex-grow: 1;
    }
    p{
        text-align: center;
    }
`