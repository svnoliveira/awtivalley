import styled from "styled-components";

export const StyledX = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 19px;
`;

export const StyledModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  h1 {
    font-weight: 600;
  }
  > div {
    position: relative;
    width: min(20rem, 95%);
    background-color: white;
    padding: 1rem;
    margin: 15% auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    padding: 5px 5px;
    border-radius: 3px;
    font-size: 16px;
    color: white;
    background-color: var(--dark-red);
    transition: 0.4s ease-in-out;
    &:hover {
      background-color: var(--red);
    }
  }
`;
