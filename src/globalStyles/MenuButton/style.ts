import styled, { css } from "styled-components";

export const MenuButton = styled.button<{$selected: boolean}>`
  height: 60px;
  min-width: 200px;
  font-size: 18px;
  color: var(--grey);
  border-bottom: solid 3px white;
  ${({$selected}) => {
    if ($selected){
        return css`
        color: black;
        border-color: black;
        `
    }
  }}
`;