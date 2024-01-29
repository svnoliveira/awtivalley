import styled, { css } from "styled-components";

export const StyledBonusCard = styled.div<{ $bonus: string | undefined }>`
  position: relative;
  counter-increment: list;
  width: min(700px, 75vw);
  margin: 2rem auto;
  padding: 2rem 1rem 1rem;
  box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: white;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    ${({ $bonus }) => {
      switch ($bonus) {
        case "0%":
          return css`
            background: linear-gradient(
              to right,
              hsl(0, 71%, 62%) 10%,
              hsl(0, 71%, 88%) 100%
            );
          `;
        case "50%":
          return css`
            background: linear-gradient(
              to right,
              hsl(50, 71%, 62%) 10%,
              hsl(50, 71%, 88%) 100%
            );
          `;
        case "75%":
          return css`
            background: linear-gradient(
              to right,
              hsl(90, 71%, 62%) 10%,
              hsl(90, 71%, 88%) 100%
            );
          `;
        case "100%":
          return css`
            background: linear-gradient(
              to right,
              hsl(140, 71%, 37%) 10%,
              hsl(140, 71%, 50%) 100%
            );
          `;
        default:
          break;
      }
    }}
  }

  h3 {
    display: flex;
    align-items: baseline;
    color: rgb(70 70 70);
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    border-radius: 50%;
    color: white;
    font-weight: 800;
    ${({ $bonus }) => {
      switch ($bonus) {
        case "0%":
          return css`
            background: linear-gradient(
              to right,
              hsl(0, 71%, 62%) 90%,
              hsl(0, 71%, 88%) 100%
            );
          `;
        case "50%":
          return css`
            background: linear-gradient(
              to right,
              hsl(50, 71%, 62%) 90%,
              hsl(50, 71%, 88%) 100%
            );
          `;
        case "75%":
          return css`
            background: linear-gradient(
              to right,
              hsl(90, 71%, 62%) 90%,
              hsl(90, 71%, 88%) 100%
            );
          `;
        case "100%":
          return css`
            background: linear-gradient(
              to right,
              hsl(140, 71%, 37%) 90%,
              hsl(140, 71%, 50%) 100%
            );
          `;
        default:
          break;
      }
    }}
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px black;
  margin-top: 5px;
  >:first-child {
    width: 50%;
    padding: 5px;
    background-color: #F1F1F1;
  }
  >:last-child{
    width: 50%;
    text-align: right;
  }
`;