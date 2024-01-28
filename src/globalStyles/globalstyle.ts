import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding: 0;
        outline:0;
        box-sizing: border-box;
    }
    html, body, main {
        height: 100%;
        margin: 0;
    }

    :root { 
        --grey: #9A9A9A;
        --grey-dark: #242424;
        --background: #1A1A1A;
        --black: #1F1E1F;
        --red: #ff0000;
        --dark-red: #9C0000;
        --foreground: 0, 0, 0;
        --background-start: #FF0000;
        --background-end: #D50000;
       }

    a, button {
        color: var(--black);
        text-decoration: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    ul, li {
        list-style: none;
    }

    main, header, footer {
        color: var(--black);
    }
`