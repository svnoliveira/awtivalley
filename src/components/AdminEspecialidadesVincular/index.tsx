"use client";

import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { adminStore } from "@/stores/adminStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { StyledContainer } from "./style";

export const AdminEspecialidadesVincular = () => {
  const { adminActiveUser, adminActiveEspecialidade } = adminStore(
    (state) => state
  );
  const { addEspecialidade } = especialidadeStore((state) => state);
  return (
    <StyledContainer>
      {adminActiveEspecialidade ? (
        adminActiveUser ? (
          <p>
            Registrar Especialidade: {adminActiveEspecialidade?.nome} ao
            Colaborador {adminActiveUser?.nome}?
          </p>
        ) : (
          <p>Selecione um Colaborador.</p>
        )
      ) : (
        <p>Selecione uma especialidade.</p>
      )}
      {adminActiveUser && adminActiveEspecialidade && (
        <StyledSubmitButton
          $error={false}
          onClick={() =>
            addEspecialidade(adminActiveEspecialidade, adminActiveUser)
          }
        >
          Registrar
        </StyledSubmitButton>
      )}
    </StyledContainer>
  );
};
