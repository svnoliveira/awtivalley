"use client";

import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { userStore } from "@/stores/userStore";
import { AdminCursosVincular } from "../AdminCursosVincular";
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";
import { StyledTable, ThCellHeader, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledSection } from "./style";

export const AdminCursosMenu = () => {
  const userList = userStore((state) => state.userList);
  const {
    adminActiveCurso,
    setAdminActiveCurso,
    setAdminActiveUser,
  } = adminStore((state) => state);
  const { cursoList, removeCurso } = cursoStore(
    (state) => state
  );
  return (
    <StyledSection>
      <AdminNav>
        {cursoList &&
          cursoList.map((curso) => (
            <AdminNavButton $selected={adminActiveCurso === curso ? true : false}
              onClick={() => setAdminActiveCurso(curso)}
              key={curso.id}
            >
              {curso.nome}
            </AdminNavButton>
          ))}
      </AdminNav>
      
      <AdminCursosVincular />
      <StyledTable>
        <tr>
        <ThCellHeader colSpan={5}>
        {adminActiveCurso &&
          `Funcionários no curso de ${adminActiveCurso?.nome}`}
      </ThCellHeader>
        </tr>
        <tr>
          <ThTitleRow>Nome</ThTitleRow>
          <ThTitleRow>Passaporte</ThTitleRow>
          <ThTitleRow>Cargo</ThTitleRow>
          <ThTitleRow>Setor</ThTitleRow>
        </tr>
        {adminActiveCurso &&
          adminActiveCurso.users.map((userID) => {
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
                      removeCurso(adminActiveCurso, user!)
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
