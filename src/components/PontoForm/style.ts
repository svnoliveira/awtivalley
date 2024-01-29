import styled from "styled-components";

export const StyledSection = styled.section`
  width: 100%;
  height: 100dvh;
  position: relative;
  background: linear-gradient(to bottom, #9C0000 0%, var(--background-start) 50%, #9C0000 100%);
  a{
    text-decoration: underline;
    color: var(--red);
    font-size: 16px;
    position: absolute;
    top: 10px;
    left: 50px;
  }
`;

export const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.44);
  height: min(600px, 80dvh);
  width: min(400px, 90vw);
  padding: 20px;
  >span{
    font-size: 20px;
    color: var(--grey);
  }
  >img{
    width: 300px;
    height: auto;
  }
`;
