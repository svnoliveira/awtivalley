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
