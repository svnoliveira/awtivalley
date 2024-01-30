import styled from "styled-components";

export const StyledDiv = styled.div`
    background-color: #EEEEEE;
    color: var(--grey);
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 10px 5px 10px 30px;
    border: 2px solid var(--grey);
    border-radius: 5px;
    margin-top: 20px;

    >label{
        position: absolute;
        top: -8px;
        left: 15px;
        background-color: white;
        border-radius:25%;
        font-size: 10px;
        padding: 0 5px;
    }

    >textarea{
        width: 100%;
        border: none;
        background-color: transparent;
        font-size: 18px;
    }

    >p{
        position: absolute;
        color: var(--red);
        font-size: 13px;
        bottom: -18px;
        left: 0;
    }

    >img{
        opacity: 0.5;
    }
`