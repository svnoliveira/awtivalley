import { HomeMenuCard } from "@/fragments/HomeMenuCards";
import { StyledContainer, StyledList, StyledSection } from "./style";
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { checkUserCursosRole, checkUserRole, checkIngressoRole} from "@/utils/operations";

export const HomeHero = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <StyledList>
          {(user?.is_superuser) && (
            <li>
              <Link href="/admin">
                <HomeMenuCard iconUrl="/icons/lock.svg">Admin</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/registro-de-ponto">
                <HomeMenuCard iconUrl="/icons/ponto.svg">Registro de Ponto</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/indicadores">
                <HomeMenuCard iconUrl="/icons/indicadores.svg">Histórico de Registros</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/dashboard">
                <HomeMenuCard iconUrl="/icons/person.svg">Colaborador</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/registercurriculo">
                <HomeMenuCard iconUrl="/icons/register.svg">Cadastro de Currículos</HomeMenuCard>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/registercurriculo">
                <HomeMenuCard iconUrl="/icons/register.svg">Cadastro de Currículos</HomeMenuCard>
              </Link>
            </li>
          )} 
          {/* {user && (
            <li>
              <Link href="/DashboardMiniGame">
                <HomeMenuCard iconUrl="/icons/icon_minigame.gif">MiniGameCDA</HomeMenuCard>
              </Link>
            </li>
          )} */}
          {!user && (
            <li>
              <Link href="/login">
                <HomeMenuCard iconUrl="/icons/login.svg">Login</HomeMenuCard>
              </Link>
            </li>
          )}
          {(user?.is_superuser || checkUserRole(user) || checkIngressoRole(user)) && (
            <li>
              <Link href="/DashboardIngresso">
                <HomeMenuCard iconUrl="/icons/register.svg">Gestão Ingressos</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/DashboardCursos">
                <HomeMenuCard iconUrl="/icons/book.svg">Provas dos Cursos</HomeMenuCard>
              </Link>
            </li>
          )}
          {(user?.is_superuser || checkUserCursosRole(user)) && (
            <li>
              <Link href="/cursos">
                <HomeMenuCard iconUrl="/icons/person.svg">Gestão de Cursos</HomeMenuCard>
              </Link>
            </li>
          )}
          {/* {user && (
            <li>
              <Link href="/registerchamados">
                <HomeMenuCard iconUrl="/icons/register.svg">Formulário de Chamados</HomeMenuCard>
              </Link>
            </li>
          )} */}        
          {/* {!user && (
            <li>
              <Link href="/agendamento-de-consultas">
                <HomeMenuCard iconUrl="/icons/register.svg">Agendamento de Consultas</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/agendamento-de-consultas">
                <HomeMenuCard iconUrl="/icons/register.svg">Agendamento de Consultas</HomeMenuCard>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/agendamento-psicotecnico">
                <HomeMenuCard iconUrl="/icons/register.svg">Agendamento de Psicotécnico</HomeMenuCard>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/agendamento-psicotecnico">
                <HomeMenuCard iconUrl="/icons/register.svg">Agendamento de Psicotécnico</HomeMenuCard>
              </Link>
            </li>
          )} */}
        </StyledList>
      </StyledContainer>
    </StyledSection>
  );
};
