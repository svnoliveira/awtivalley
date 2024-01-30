"use client";

import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { StyledContainer } from "./style";

export const AdminCursosVincular = () => {
  const { adminActiveUser, adminActiveCurso } = adminStore(
    (state) => state
  );
  const { addCurso } = cursoStore((state) => state);
  return (
    <StyledContainer>
      {adminActiveCurso ? (
        adminActiveUser ? (
          <p>
            Registrar colaborador {adminActiveUser?.nome}? ao 
            Curso: {adminActiveCurso?.nome}
          </p>
        ) : (
          <p>Selecione um Colaborador.</p>
        )
      ) : (
        <p>Selecione um curso.</p>
      )}
      {adminActiveUser && adminActiveCurso && (
        <StyledSubmitButton
          $error={false}
          onClick={() =>
            addCurso(adminActiveCurso, adminActiveUser)
          }
        >
          Registrar
        </StyledSubmitButton>
      )}
    </StyledContainer>
  );
};
