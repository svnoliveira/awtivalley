import { userStore } from "@/stores/userStore";
import {
  InfoCard,
  StyledContainer,
  StyledSection,
  StyledUserBanner,
} from "./style";
import { useState } from "react";
import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";
import { DashboardPasswordRecovery } from "../DashboardPasswordRecovery";

export const DashboardCard = () => {
  const user = userStore((state) => state.userData?.user);
  const [menu, setMenu] = useState<string>("");

  return (
    <StyledSection>
      <StyledUserBanner>
        <h1>
          Bem Vindo{"(a)"} {user?.nome}
        </h1>
      </StyledUserBanner>
      <MenuNav>
        <MenuButton
          $selected={menu === "pessoal" ? true : false}
          onClick={() => setMenu("pessoal")}
        >
          Informações pessoais
        </MenuButton>
        <MenuButton
          $selected={menu === "licença" ? true : false}
          onClick={() => setMenu("licença")}
        >
          Licença Médica
        </MenuButton>
        <MenuButton
          $selected={menu === "especialidade" ? true : false}
          onClick={() => setMenu("especialidade")}
        >
          Especialidades
        </MenuButton>
        <MenuButton
          $selected={menu === "curso" ? true : false}
          onClick={() => setMenu("curso")}
        >
          Cursos
        </MenuButton>
      </MenuNav>
      <StyledContainer>
        {menu == "pessoal" && (
          <>
          <DashboardPasswordRecovery />
          <InfoCard>
            <li>
              <span>Nome: </span>
              <span>{user?.nome}</span>
            </li>
            <li>
              <span>Passaporte: </span>
              <span>{user?.passaporte}</span>
            </li>
            <li>
              <span>Discord ID: </span>
              <span>{user?.discord_id}</span>
            </li>
            <li>
              <span>Cargo: </span>
              <span>{user?.cargo}</span>
            </li>
            <li>
              <span>Setor: </span>
              <span>{user?.setor}</span>
            </li>
            <li>
              <span>Função: </span>
              <span>{user?.funcao}</span>
            </li>
            <li>
              <span>Funções Extra: </span>
              <span>{user?.funcoes_extra}</span>
            </li>
            <li>
              <span>Efetivação: </span>
              <span>{user?.efetivacao}</span>
            </li>
            <li>
              <span>Última Promoção: </span>
              <span>{user?.ultima_promocao}</span>
            </li>
            <li>
              <span>Observações: </span>
              <span>{user?.observacoes}</span>
            </li>
          </InfoCard>
          </>
        )}
        {menu == "licença" && (
          <InfoCard>
            <li>
              <span>Ciclo: </span>
              <span>{user?.licenca_medica.ciclo}</span>
            </li>
            <li>
              <span>Data: </span>
              <span>{user?.licenca_medica.data}</span>
            </li>
            <li>
              <span>Responsável: </span>
              <span>{user?.licenca_medica.responsavel}</span>
            </li>
            <li>
              <span>CRM: </span>
              <span>{user?.licenca_medica.crm}</span>
            </li>
            <li></li>
          </InfoCard>
        )}
        {menu == "especialidade" && (
          <InfoCard>
            {user?.especialidades.map((especialidade) => (
              <li key={especialidade.id}>
                <span></span>
                <span>{especialidade.nome}</span>
              </li>
            ))}
            <li></li>
          </InfoCard>
        )}
        {menu == "curso" && (
          <InfoCard>
            {user?.cursos.map((curso) => (
              <li key={curso.id}>
                <span></span>
                <span>{curso.nome}</span>
              </li>
            ))}
            <li></li>
          </InfoCard>
        )}
      </StyledContainer>
    </StyledSection>
  );
};
