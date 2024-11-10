// style.ts

import styled from "styled-components";

export const StyledSection = styled.section`
  min-height: 74vh;
  padding: 20px;
`;

export const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const InfoCard = styled.ul`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: solid 1px #ddd;
  }
`;

export const StyledButtonLink = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;
