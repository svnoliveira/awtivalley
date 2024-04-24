"use client";


import {
  StyledContainer,
  StyledSection,
  StyledUserBanner,

} from "./style";
import { CursosEquipeMenu } from "../CursosEquipeMenu";
import { GestaoCursosMenu } from "../GestaoCursosMenu";
import { adminStore } from "@/stores/adminStore";


import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";

export const CursosNav = () => {
  const { setActiveAdminScreen, activeAdminScreen } = adminStore(
    (state) => state
  );

  return (
    <StyledSection>
      <StyledUserBanner>
        <h1>
          Bem Vindo{"(a)"}
        </h1>
      </StyledUserBanner>
      <MenuNav>
      <MenuButton
            $selected={activeAdminScreen === "funcionarios" ? true : false}
            onClick={() => setActiveAdminScreen("funcionarios")}
          >
            Funcionários
          </MenuButton>
          <MenuButton
            $selected={activeAdminScreen === "cursos" ? true : false}
            onClick={() => setActiveAdminScreen("cursos")}
          >
            Cursos
          </MenuButton>
      </MenuNav>
      <StyledContainer>
          {activeAdminScreen === "funcionarios" && <CursosEquipeMenu />}
          {activeAdminScreen === "cursos" && <GestaoCursosMenu />}
        </StyledContainer>
    </StyledSection>
  );
};
