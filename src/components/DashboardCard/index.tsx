"use client";

import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { userStore } from "@/stores/userStore";
import { AdminCursosVincular } from "../AdminCursosVincular";
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";
import {
  StyledTable,
  ThCellHeader,
  ThTitleRow,
} from "@/globalStyles/StyledTable/style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledSection, StyledTitle, StyledButtonLink } from "./style";
import { AdminCursosModal } from "../AdminCursosModal";
import { checkValidade } from "@/utils/operations";

export const AdminCursosMenu = () => {
  const userList = userStore((state) => state.userList);
  const { adminActiveCurso, setAdminActiveCurso, setAdminActiveUser } =
    adminStore((state) => state);
  const { cursoList, removeCurso } = cursoStore((state) => state);
  return (
    <StyledSection>
      <AdminCursosModal />
      <AdminNav>
        {cursoList &&
          cursoList.map((curso) => (
            <AdminNavButton
              $selected={adminActiveCurso === curso ? true : false}
              onClick={() => setAdminActiveCurso(curso)}
              key={curso.id}
            >
              {curso.nome}
            </AdminNavButton>
          ))}
      </AdminNav>
      {adminActiveCurso && (
        <StyledTitle>
          {adminActiveCurso.nome} -{" "}
          {adminActiveCurso.validade > 0
            ? `Curso válido por ${adminActiveCurso.validade} dias`
            : "Permanente"}
        </StyledTitle>
      )}
      <AdminCursosVincular />
      <StyledTable>
        <tr>
          <ThCellHeader colSpan={8}>
            {adminActiveCurso &&
              `Funcionários no curso de ${adminActiveCurso?.nome}`}
          </ThCellHeader>
        </tr>
        <tr>
          <ThTitleRow>Nome</ThTitleRow>
          <ThTitleRow>Passaporte</ThTitleRow>
          <ThTitleRow>Cargo</ThTitleRow>
          <ThTitleRow>Setor</ThTitleRow>
          <ThTitleRow>Certificado</ThTitleRow>
          <ThTitleRow>Início</ThTitleRow>
          <ThTitleRow>Vencimento</ThTitleRow>
        </tr>
        {adminActiveCurso &&
          adminActiveCurso.users.map((userID) => {
            const user = userList.find((entry) => entry.id === userID);
            const userCurso = user?.cursos.find(
              (entry) => entry.nome === adminActiveCurso.nome
            );
            return (
              <tr key={userID} onClick={() => setAdminActiveUser(user!)}>
                <td>{user?.nome}</td>
                <td>{user?.passaporte}</td>
                <td>{user?.cargo}</td>
                <td>{user?.setor}</td>
                <td>
                  {userCurso?.certificado ? (
                   <StyledButtonLink onClick={() => setShowModalCurso(true)}>
                    Certificado
                  </StyledButtonLink>
                  ) : (
                    " - "
                  )}
                </td>
                <td>
                  {userCurso?.inicio
                    ? new Date(userCurso.inicio).toLocaleDateString("pt-br")
                    : " - "}
                </td>
                <td>
                  {userCurso?.vencimento
                    ? checkValidade(userCurso.vencimento)
                      ? new Date(userCurso.vencimento).toLocaleDateString(
                          "pt-br"
                        )
                      : `EXPIRADO em ${new Date(
                          userCurso.vencimento
                        ).toLocaleDateString("pt-br")}`
                    : " - "}
                </td>
                <td>
                  <StyledSubmitButton
                    $error={false}
                    onClick={() => removeCurso(adminActiveCurso, user!)}
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
