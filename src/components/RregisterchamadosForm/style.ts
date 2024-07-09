import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
   
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  width: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;

  span {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const StyledSelectWrapper = styled.div`
  margin-top: 20px;

  input[type="file"] {
    display: block;
    margin: 0 auto;
  }
`;

export const StyledSubmitButton = styled.button<{ $error: boolean }>`
  background-color: ${({ $error }) => ($error ? '#d9534f' : '#6c757d')}; /* Cinza para estado normal */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: ${({ $error }) => ($error ? '#c9302c' : '#5a6268')}; /* Cinza mais escuro para hover */
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
