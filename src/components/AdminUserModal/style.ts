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
    height: 46rem;
    background-color: white;
    padding: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;
export const StyledButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  &:hover {
    background-color: var(--dark-red);
  }
`;

export const StyledInputContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  row-gap: 0.8rem;
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
    padding: 10px 5px 10px 400px;
    background-color: #eeeeee;
    border: 2px solid var(--grey);
    border-radius: 5px;
    font-size: 18px;
  }
  > div {
    width: 35rem;
  }
`;
