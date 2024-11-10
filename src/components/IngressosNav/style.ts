import styled, { css } from "styled-components";

export const StyledSection = styled.section`
  min-height: 74vh;
`;
export const StyledContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const InfoCard = styled.ul`
  position: sticky;
  top: 0;
  background-color: white;
  margin: 20px auto 0 auto;
  width: min(90vw, 600px);
  min-height: 110px;
  padding: 20px;
  z-index: 2;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  li {
    cursor: pointer;
    border-top: solid 1px var(--grey);
    display: flex;
    transition: 1s;
    margin-bottom: 2px;
    &:hover{
      box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
    }
    > :first-child {
      background-color: #f6f6f6;
      width: 50%;
      text-align: left;
    }
    > :last-child {
      width: 50%;
    }
    p {
      padding: 5px 0 5px 5px;
    }
  }
  :last-child {
    :first-child {
      background-color: white;
    }
  }
`;
