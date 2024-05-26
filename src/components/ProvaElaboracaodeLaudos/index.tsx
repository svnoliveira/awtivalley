import {   StyledSection,
  StyledContainer,
  StyledList,
  StyledListItem } from "./style";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import Link from "next/link";
import {
  CheckFuncEstagiarioUserCursos,
  CheckFuncInternoUserCursos,
  CheckFuncParamedicoUserCursos,
  CheckFuncResidenteUserCursos,
  checkUserCursosRole,
  checkUserRole,
} from "@/utils/operations";

export const ProvaElaboracaodeLaudos = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Provas Elaboração de Laudos</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          
          <StyledListItem>
            <center><h2>📄 Elaboração de Laudos</h2></center>
            <p>
              <strong>Prova Prática:</strong>
            </p>
            <ul>
              <li>➜ Você deverá realizar um laudo utilizando os conhecimentos aprendidos no curso.</li>
              <li>➜ O laudo, de preferência, deverá ser realizado na especialidade que o médico queira seguir, caso o mesmo não tenha ideia, fazer um laudo qualquer, podendo escolher alguma especialidade.</li>
              <li>➜ O médico terá o prazo de 1 semana para realizar o laudo e enviar para o Inst. Curso, caso não envie no prazo, o mesmo estará reprovado.</li>
            </ul>
            <hr></hr>
            <p>
              <strong>Observações:</strong>
            </p>
            <ul>
              <li>➜ Sempre peça apoio para realizar o seu laudo. Em nosso E-mail possui os modelos de exemplo para seguir.</li>
              <li>➜ O médico só irá ser aprovado no curso se atingir a nota de 7 ou acima.</li>
            </ul>
          </StyledListItem>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};