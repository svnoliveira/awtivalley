import styled, { css } from "styled-components";

export const StyledSection = styled.section`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: transparent;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;

  span {
    padding: 20px 40px;
    border-radius: 5px;
    width: min(80vw, 700px);
    height: fit-content;
    margin-top: 5%;
  }
`;

export const StyledMessage = styled.span`
  background-color: #F3F6F1;
  border: 2px solid #245501;
  color: #557b39;
`;

export const StyledError = styled.span`
  background-color: #ff9292;
  border: 2px solid var(--dark-red);
  color: var(--red);
`;
