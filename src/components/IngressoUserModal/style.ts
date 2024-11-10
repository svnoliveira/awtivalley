import styled from "styled-components";

export const StyledSection = styled.section`
  padding: 8px 0 0 2px;
`;

export const StyledX = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 19px;
`;

export const StyledEditModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    position: relative;
    width: min(90rem, 95%);
    max-width: 90%;
    height: 80vh;
    max-height: 90%;
    background-color: white;
    padding: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
    }
  }
`;

export const StyledButton = styled.button`
  position: absolute;
  background-color: red;
  color: white;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  left: 50%;
  
  &:hover {
    background-color: var(--dark-red);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }
`;



export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.8rem;

  @media (max-width: 768px) {
    row-gap: 0.5rem;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    & > div {
      flex: 1;
      min-width: 45%;
      
      @media (max-width: 768px) {
        min-width: 100%;
      }
    }
  }

  > :first-child {
    height: 69px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: relative;
    gap: 0.5rem;

    > label {
      position: absolute;
      top: 17px;
      left: 15px;
      background-color: white;
      border-radius: 25%;
      font-size: 10px;
      padding: 0 5px;
      color: var(--grey);
    }
  }

  select {
    padding: 10px;
    background-color: #eeeeee;
    border: 2px solid var(--grey);
    border-radius: 5px;
    font-size: 18px;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 16px;
      padding: 8px;
    }
  }
`;
