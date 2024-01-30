import styled from "styled-components";

export const StyledUserCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 15px;
    transition: 0.8s ease-in-out;
    height: 560px;
    overflow-y: auto;
    cursor: pointer;
    h3{
      font-size: 14px;
      color: var(--grey);
    }
    &:hover{
        background-color: var(--grey);
        min-height: 560px;
        height: auto;
        overflow-y: none;
        h1, h3{
        color: white;
    }
    }
`

export const InfoCard = styled.ul`
  margin: 5px auto 0 auto;
  width: min(90vw, 370px);
  padding: 5px;
  min-height: 110px;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  border-radius: 5px;
  li {
    cursor: pointer;
    border-bottom: solid 1px var(--grey);
    display: flex;
    transition: 1s;
    min-height: 30px;
    > :first-child {
      background-color: #f6f6f6;
      width: 180px;
      text-align: left;
    }
    > :last-child {
      width: 100%;
      background-color: white;
    } 
  }
  :last-child {
    min-height: 0px;
      :first-child {
      background-color: white;
    }
  }
`;