"use client";
import { AdminSelectedUserCard } from "@/fragments/AdminSelectedUserCard";
import { AdminFuncionariosMenu } from "../AdminFuncionariosMenu";
import { adminStore } from "@/stores/adminStore";
import { AdminSelectedPeriodCard } from "@/fragments/AdminSelectedPeriodCard";
import { InfoCard, StyledContainer, StyledSection } from "./style";
import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";

export const IngressosNav = () => {
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
        </MenuNav>
        <InfoCard>
          <AdminSelectedUserCard />
          <AdminSelectedPeriodCard />
        </InfoCard>
        <StyledContainer>
          {activeAdminScreen === "funcionarios" && <AdminFuncionariosMenu />}      
        </StyledContainer>
      </StyledSection>
    </>
  );
};
