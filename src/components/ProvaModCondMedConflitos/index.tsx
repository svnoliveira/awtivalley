import {   StyledSection,
  StyledContainer,
  StyledList,
  StyledListItem } from "./style";
import { userStore } from "@/stores/userStore";

export const ProvaModCondMedConflitos = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Curso de Modulação</h1>
        </center>
        <hr />
        <hr />
        <StyledList>          
          <StyledListItem>
            <center><h2>🗣️ Modulação</h2></center>
            <p>
              <strong>Aula Teórico:</strong>
              <li>➜ Acesse a Sala de aula clicando <b><a href="https://classroom.google.com/c/Njg2ODMwNzY5NDIx?cjc=5gcuuq2">AQUI</a></b>, participe da turma e asiste a aula e faça a prova.</li>
              <li>➜ Após finalizar a prova, volte para a classe vai clicar em Ver instuções e marcar como Concluída.</li>
            </p>
            <p>
              <strong>Observações:</strong>
            </p>
            <ul>
              <li>➜ Qualquer problema encontrado, sinalizar para a equipe de Cursos.</li>
              <li>➜ Os Resultados serão informados na aba de ✅┃𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 do Discord.</li>
            </ul>
          </StyledListItem>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};