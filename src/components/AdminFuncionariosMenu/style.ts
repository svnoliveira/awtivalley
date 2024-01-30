import styled from "styled-components";

export const StyledSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
`

export const StyledSearch = styled.div`
color: var(--grey);
text-align: center;
height: 15vh;
display: flex;
flex-direction: column;
justify-content: space-around;
width: min(500px, 100%);
input{
    padding: 5px;
    width: 100%;
}
`
export const StyledCardList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
`