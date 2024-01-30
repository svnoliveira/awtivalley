import styled, { css } from "styled-components";

export const AdminNavButton = styled.button<{ $selected: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  ${({ $selected }) => {
    if ($selected) {
      return css`
        background-color: red;
      `;
    } else {
      return css`
        background-color: #FFC6C6;
      `;
    }
  }}
`;
