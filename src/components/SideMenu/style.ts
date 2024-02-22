import styled from "styled-components";

export const StyledBlankDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100vh;
  width: 100vw;
`;

export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  width: min(85vw, 377px);
  background-color: white;
  box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.36);
  height: 100%;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  align-items: center;
  justify-content: space-around;
  position: relative;
  color: white;
  font-weight: 300;
  height: 360px;
  cursor: pointer;
  > img {
    height: auto;
    width: 60%;
    object-fit: cover;
  }
  > :last-child {
    position: absolute;
    bottom: -40px;
    padding: 15px 23px;
    > span {
      font-size: 34px;
    }
  }
  h3 {
    font-weight: 200;
    font-size: 22px;
  }
`;
export const StyledSideList = styled.ul`
  margin-top: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLi = styled.li`
  height: 60px;
  width: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: red;
    border-top-right-radius: 50em;
    border-bottom-right-radius: 50em;
    box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.36);
    > :nth-child(2) {
      color: white;
    }
  }
  > :nth-child(2) {
    margin-right: auto;
    margin-left: 30px;
    font-weight: 200;
    font-size: 22px;
    color: var(--grey);
  }
`;
