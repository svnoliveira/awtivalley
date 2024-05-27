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

export const ProvaComporCondEmedConflitos = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Comportamento, Conduta & Mediação de Conflitos</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfGmBjWnf98UGv7mCEewmXgGYSxSsR39Bl4qhM4-DDO5x7M_A/viewform?embedded=true"
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
