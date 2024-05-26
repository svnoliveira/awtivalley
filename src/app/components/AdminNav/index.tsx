"use client";
import { AdminSelectedUserCard } from "@/fragments/AdminSelectedUserCard";
import { AdminFuncionariosMenu } from "../AdminFuncionariosMenu";
import { AdminEspecialidadesMenu } from "../AdminEspecialidadesMenu";
import { AdminCursosMenu } from "../AdminCursosMenu";
import { adminStore } from "@/stores/adminStore";
import { AdminPontosMenu } from "../AdminPontosMenu";
import { AdminBonusMenu } from "../AdminBonusMenu";
import { AdminExamesMenu } from "../AdminExamesMenu";
import { AdminSelectedPeriodCard } from "@/fragments/AdminSelectedPeriodCard";
import { InfoCard, StyledContainer, StyledSection } from "./style";
import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";

export const AdminNav = () => {
  const { setActiveAdminScreen, activeAdminScreen } = adminStore(
    (state) => state
  );

  return (
    <>
      <StyledSection>
        <MenuNav>
          <MenuButton
            $selected={activeAdminScreen === "funcionarios" ? true : false}
            onClick={() => setActiveAdminScreen("funcionarios")}
          >
            Funcionários
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "pontos" ? true : false}
            onClick={() => setActiveAdminScreen("pontos")}
          >
            Registros de ponto
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "bonus" ? true : false}
            onClick={() => setActiveAdminScreen("bonus")}
          >
            Listas de Bonus
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "cursos" ? true : false}
            onClick={() => setActiveAdminScreen("cursos")}
          >
            Cursos
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "especialidades" ? true : false}
            onClick={() => setActiveAdminScreen("especialidades")}
          >
            Especialidades
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "exames" ? true : false}
            onClick={() => setActiveAdminScreen("exames")}
          >
            Exames
          </MenuButton>
        </MenuNav>
        <InfoCard>
          <AdminSelectedUserCard />
          <AdminSelectedPeriodCard />
        </InfoCard>
        <StyledContainer>
          {activeAdminScreen === "funcionarios" && <AdminFuncionariosMenu />}
          {activeAdminScreen === "pontos" && <AdminPontosMenu />}
          {activeAdminScreen === "bonus" && <AdminBonusMenu />}
          {activeAdminScreen === "especialidades" && (
            <AdminEspecialidadesMenu />
          )}
          {activeAdminScreen === "cursos" && <AdminCursosMenu />}
          {activeAdminScreen === "exames" && <AdminExamesMenu />}
        </StyledContainer>
      </StyledSection>
    </>
  );
};
