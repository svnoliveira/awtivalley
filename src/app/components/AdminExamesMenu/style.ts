import styled from "styled-components";

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  padding-top: 20px;
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

export const InfoExameCard = styled.ul`
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;