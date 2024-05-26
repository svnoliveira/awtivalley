import { StyledContainer, StyledList, StyledSection } from "./style";
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

export const ProvaExamesLabETecdeColetas = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Prova de Exames Laboratoriais e Técnicas de Coletas</h1>
        </center>
        <hr />
        <hr />
        <StyledList>

        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};