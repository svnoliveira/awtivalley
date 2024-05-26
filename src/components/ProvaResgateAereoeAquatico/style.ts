import styled from "styled-components";

export const StyledSection = styled.section`
  min-height: 70vh;
`;

export const StyledContainer = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px; /* Adicionei padding para espaçamento interno */
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column; /* Alterado para coluna para melhorar a legibilidade do texto */
  align-items: center;
  justify-content: flex-start; /* Ajustado para alinhar no início da coluna */
  gap: 20px; /* Espaçamento entre os itens */
  min-height: 70vh;
  margin: 30px 0;
`;

export const StyledListItem = styled.li`
  list-style-type: none; /* Removendo os marcadores de lista padrão */
  width: 100%; /* Ocupa a largura total do container */
  max-width: 600px; /* Limitando a largura para melhor legibilidade */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
