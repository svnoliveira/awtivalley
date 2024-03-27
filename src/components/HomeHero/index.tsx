import { HomeMenuCard } from "@/fragments/HomeMenuCards";
import { StyledContainer, StyledList, StyledSection } from "./style"
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { checkUserRole } from "@/utils/operations";


export const HomeHero = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>
        <StyledList>
          {user?.is_superuser && <li><Link href={"/admin"}>
            <HomeMenuCard iconUrl="/icons/lock.svg">Admin</HomeMenuCard>
          </Link></li>}
          {user && <li><Link href={"/registro-de-ponto"}>
            <HomeMenuCard iconUrl="/icons/ponto.svg">Registro de Ponto</HomeMenuCard>
          </Link></li>}
          {user && <li><Link href={"/indicadores"}>
            <HomeMenuCard iconUrl="/icons/indicadores.svg">Histórico de Registros</HomeMenuCard>
          </Link></li>}
          {user && <li><Link href={"/dashboard"}>
            <HomeMenuCard iconUrl="/icons/person.svg">Colaborador</HomeMenuCard>
          </Link></li>}
          {!user && <li><Link href={"/login"}>
            <HomeMenuCard iconUrl="/icons/login.svg">Login</HomeMenuCard>
          </Link></li>}
          {checkUserRole(user) && <li><Link href={"/register"}>
            <HomeMenuCard iconUrl="/icons/register.svg">Cadastrar novos colaboradores</HomeMenuCard>
          </Link></li>}
          {!user && <li><Link href={"/registercurriculo"}>
            <HomeMenuCard iconUrl="/icons/register.svg">Cadastro de Currículos</HomeMenuCard>
          </Link></li>}
        </StyledList>
      </StyledContainer>
    </StyledSection>
  )
}