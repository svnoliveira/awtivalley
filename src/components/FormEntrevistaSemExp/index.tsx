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

export const FormEntrevistaSemExp = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Entrevista SEM Experiência</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeROnlsxiGVOmsg-4V0zOKnX39L44CZ5VdadAgnH8eIDnO0cw/viewform?embedded=true"
            width="640"
            height="2667"
            style={{ border: "none", margin: "0" }} // Utilize CSS inline para estilos
            title="Google Form"
          >
            Carregando…
          </iframe>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};