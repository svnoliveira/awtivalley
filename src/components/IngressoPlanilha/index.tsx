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

export const IngressoPlanilha = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Planilha de Ingresso</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
        
        <iframe
            src="https://docs.google.com/spreadsheets/d/1KZOYBfxjjqcDsfbJRVBVH3rdtkSYMs24FOO1Zm39W9s/edit?gid=208046510"
            width="3000"
            height="3000"
            style={{ border: "none", margin: "0" }} // Utilize CSS inline para estilos
            title="Google Sheet"
          >
            Carregando…
          </iframe>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};