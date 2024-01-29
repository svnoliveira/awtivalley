import styled from "styled-components";

export const StyledSection = styled.section`
  min-height: 74vh;
`;
export const StyledContainer = styled.div`
  max-width: 1400px;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-items: center;
  gap: 30px;
  @media (max-width: 1280px) {
    justify-content: center;
  }
  h3 {
    color: var(--grey);
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.44);
  height: min(300px, 80dvh);
  width: min(250px, 90vw);
  padding: 20px;
  @media (max-width: 1280px) {
    flex-grow: 1;
  }
  span {
    font-size: 20px;
    color: var(--grey);
    /* margin-right: auto; */
  }
  div {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1280px) {
    justify-content: space-around;
    }
    width: 100%;
  }
  h3 {
    text-align: center;
  }
  p {
    color: red;
    font-size: 14px;
  }
`;
