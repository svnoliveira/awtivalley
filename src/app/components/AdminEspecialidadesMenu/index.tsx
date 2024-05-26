"use client";

import { adminStore } from "@/stores/adminStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { userStore } from "@/stores/userStore";
import { AdminEspecialidadesVincular } from "../AdminEspecialidadesVincular";
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";
import { StyledTable, ThCellHeader, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledSection } from "./style";
import { AdminEspecialidadesModal } from "../AdminEspecialidadesModal";

export const AdminEspecialidadesMenu = () => {
  const userList = userStore((state) => state.userList);
  const {
    adminActiveEspecialidade,
    setAdminActiveEspecialidade,
    setAdminActiveUser,
  } = adminStore((state) => state);
  const { especialidadeList, removeEspecialidade } = especialidadeStore(
    (state) => state
  );
  return (
    <StyledSection>
      <AdminEspecialidadesModal />
      <AdminNav>
        {especialidadeList &&
          especialidadeList.map((especialidade) => (
            <AdminNavButton $selected={adminActiveEspecialidade === especialidade ? true : false}
              onClick={() => setAdminActiveEspecialidade(especialidade)}
              key={especialidade.id}
            >
              {especialidade.nome}
            </AdminNavButton>
          ))}
      </AdminNav>
      
      <AdminEspecialidadesVincular />
      <StyledTable>
        <tr>
        <ThCellHeader colSpan={5}>
        {adminActiveEspecialidade &&
          `Funcionários com especialidade em ${adminActiveEspecialidade?.nome}`}
      </ThCellHeader>
        </tr>
        <tr>
          <ThTitleRow>Nome</ThTitleRow>
          <ThTitleRow>Passaporte</ThTitleRow>
          <ThTitleRow>Cargo</ThTitleRow>
          <ThTitleRow>Setor</ThTitleRow>
        </tr>
        {adminActiveEspecialidade &&
          adminActiveEspecialidade.users.map((userID) => {
            const user = userList.find((entry) => entry.id === userID);
            return (
              <tr key={userID} onClick={() => setAdminActiveUser(user!)}>
                <td>{user?.nome}</td>
                <td>{user?.passaporte}</td>
                <td>{user?.cargo}</td>
                <td>{user?.setor}</td>
                <td>
                  <StyledSubmitButton $error={false}
                    onClick={() =>
                      removeEspecialidade(adminActiveEspecialidade, user!)
                    }
                  >
                    Desvincular
                  </StyledSubmitButton>
                </td>
              </tr>
            );
          })}
      </StyledTable>
    </StyledSection>
  );
};
