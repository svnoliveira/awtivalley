import styled from "styled-components";
import discordIcon from "./discordIcon.png"; // Importe o ícone
import { url } from "inspector"; // Importe a função 'url' do styled-components

export const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const RightContainer = styled.div`
  p {
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold; /* Adicionando negrito */
  }

`;

const discordIconUrl = "https://w7.pngwing.com/pngs/705/535/png-transparent-computer-icons-discord-logo-discord-icon-rectangle-logo-smiley.png";

export const StyledButton = styled.button`
  background-image: url(${discordIconUrl}); /* Define a imagem como background */
  background-repeat: no-repeat; /* Evita a repetição do background */
  background-size: 20px; /* Define o tamanho da imagem */
  background-position: left center; /* Define a posição do ícone */
  padding-left: 30px; /* Espaçamento à esquerda para acomodar o ícone */
  border: none;
  background-color: #7289da; /* Cor de fundo do Discord */
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #5f73bc; /* Cor de fundo alterada ao passar o mouse */
  }
`;


