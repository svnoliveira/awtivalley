import styled from "styled-components"

export const StyledSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
position: sticky;
z-index: 2;
top: 0;
right: 0;
`

export const StyledSearch = styled.div`
color: var(--grey);
text-align: center;
height: 20vh;
display: flex;
flex-direction: column;
justify-content: space-around;
width: min(200px, 100%);
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 15vh;
    input{
    padding: 5px;
    width: 100%;
}
`