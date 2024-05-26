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

export const ProvaResgateAereoeAquatico = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Prova de Resgate Aéreo e Aquático</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          
          <StyledListItem>
            <center><h2>🚁 Resgate Aéreo e Aquático</h2></center>
            <p>
              <strong>Prova Prática:</strong>
            </p>
            <ul>
              <li>➜ O médico terá que realizar os procedimentos aprendidos na aula.</li>
              <li>➜ Fazer uma simulação de afogamento e ver como o médico irá proceder.</li>
              <li>➜ Fazer uma simulação de resgate aéreo e ver como o médico irá proceder.</li>
            </ul>
            <hr></hr>
            <p>
              <strong>Observações:</strong>
            </p>
            <ul>              
              <li>➜ O médico só irá ser aprovado no curso se atingir a nota de 7 ou acima.</li>
            </ul>
          </StyledListItem>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};