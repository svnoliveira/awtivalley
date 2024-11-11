import {   StyledSection,
  StyledContainer,
  StyledList,
  StyledListItem } from "./style";
import { userStore } from "@/stores/userStore";

export const ProvaDirecDefensiva = () => {
  const user = userStore((state) => state.userData?.user);
  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Curso de Direção Defensiva</h1>
        </center>
        <hr />
        <hr />
        <StyledList>          
          <StyledListItem>
            <center><h2>🚑 Direção Defensiva</h2></center>
            <p>
              <strong>Aula Teórico:</strong>
              <li>➜ Acesse a Sala de aula clicando <b><a href="https://classroom.google.com/c/NzI5Njc3NTAyNzUz?cjc=oiycvv4">AQUI</a></b>, participe da turma e asiste a aula e faça a prova.</li>
              <li>➜ Após finalizar a prova, volte para a classe vai clicar em Ver instuções e marcar como Concluída.</li>
              <li>➜ Após isto, sinalize ao Líder de cursos a conclusão da parte teórica, para prosseguir com a parte prática.</li>
            </p>
            <hr></hr>
            <p>
              <strong>Prova Prática:</strong>
            </p>
            <ul>
              <li>➜ Você deverá seguir as instruções do avaliador para definir o percurso.</li>
              <li>➜ Deverá mandar uma print da viatura, no privado do Instrutor quando chegar no primeiro Check Point.</li>
              <li>➜ Instrutor depois de avaliar a print, liberar pro final da prova.</li>
            </ul>
            <hr></hr>
            <p>
              <strong>Observações:</strong>
            </p>
            <ul>
              <li>➜ Pode ir com qualquer viatura (Ambulância ou Carro de Resgate).</li>
              <li>➜ Sirene e Giroflex desligados.</li>
              <li>➜ Todo mundo na rádio CURSOHP ou a rádio definida no momento do teste.</li>
              <li>➜ Capotar, não conseguir completar o percurso, chegar no final sem porta, capô ou porta-malas, é REPROVADO.</li>
              <li>➜ Proibido usar kit de reparo.</li>
              <li>➜ Peso da parte teórico 50%</li>
              <li>➜ Peso da parte prática 50%</li>
              <li>➜ Os Resultados serão informados na aba de ✅┃𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 do Discord.</li>
            </ul>
          </StyledListItem>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  ); 
};
