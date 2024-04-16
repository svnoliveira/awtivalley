import styled, { css } from "styled-components";

export const StyledSection = styled.section`
  min-height: 74vh;
`;
export const StyledContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const StyledUserBanner = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #ff7171;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 10%;
  h1 {
    font-size: clamp(24px, calc(44px + 20 * ((100vw - 600px) / 800)), 44px);
    font-weight: 500;
  }
`;
export const InfoCard = styled.ul`
  margin-top: 20px;
  width: min(90vw, 600px);
  min-height: 400px;
  padding: 20px;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  li {
    border-top: solid 1px var(--grey);
    display: flex;
    > :first-child {
      background-color: #f6f6f6;
      width: 50%;
    }
    span {
      padding: 5px 0 5px 20px;
    }
  }
  :last-child {
    :first-child {
      background-color: white;
      width: 100%;
    }
    margin-bottom: 5px;
  }
`;

export const InfoCursoCard = styled.ul`
  margin: 20px auto 0 auto;
  width: min(90vw, 600px);
  min-height: 400px;
  padding: 20px;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  > :first-child {
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    span {
        padding: 5px 0 5px 5px;
      }
  }
  li {
    overflow-x: auto;
    border-top: solid 1px var(--grey);
    display: flex;
    justify-content: space-between;
    > :first-child,
    > :last-child {
      background-color: #f6f6f6;
      width: 33%;
      padding: 5px 0 5px 20px;
    }
  }
  > :last-child {
    :first-child {
      background-color: white;
      width: 100%;
    }
    padding-bottom: 5px;
  }
`;
export const StyledButtonLink = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background-color: #ff0000;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5353
  }
`;