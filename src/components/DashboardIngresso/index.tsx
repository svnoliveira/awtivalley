import { DashboardIngressoCards } from "@/fragments/DashboardIngressoCards";
import { StyledContainer, StyledList, StyledSection } from "./style"
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { checkUserRole, checkIngressoRole } from "@/utils/operations";


export const DashboardIngresso = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>      
        <center><h1>Gestão de Colaboradores CMA-V</h1></center>
        <hr></hr>
        <hr></hr>
        <StyledList>
          {(user?.is_superuser || checkUserRole(user)) && <li><Link href={"register"}>
            <DashboardIngressoCards iconUrl="/icons/person.svg">Cadastrar novos colaboradores</DashboardIngressoCards>
          </Link></li>}
          {(user?.is_superuser || checkUserRole(user)) && <li><Link href={"GestaoPessoal"}>
            <DashboardIngressoCards iconUrl="/icons/ingresso.svg">Gestão Pessoal</DashboardIngressoCards>
          </Link></li>}
          {(user?.is_superuser || checkUserRole(user)) && <li><Link href={"IngressoPlanilha"}>
            <DashboardIngressoCards iconUrl="/icons/ingresso.svg">Ingresso Planilha</DashboardIngressoCards>
          </Link></li>}
          {(user?.is_superuser || checkUserRole(user) || checkIngressoRole(user)) && <li><Link href={"EntrevistaSemExperiencia"}>
            <DashboardIngressoCards iconUrl="/icons/entrevista.svg">Entrevista SEM Experiência</DashboardIngressoCards>
          </Link></li>}
          {(user?.is_superuser || checkUserRole(user) || checkIngressoRole(user)) && <li><Link href={"EntrevistaComExperiencia"}>
            <DashboardIngressoCards iconUrl="/icons/entrevista.svg">Entrevista COM Experiência</DashboardIngressoCards>
          </Link></li>}
          {(user?.is_superuser || checkUserRole(user) || checkIngressoRole(user)) && <li><Link href={"EntrevistaReingresso"}>
            <DashboardIngressoCards iconUrl="/icons/entrevista.svg">Entrevista REINGRESSO</DashboardIngressoCards>
          </Link></li>}
        </StyledList>
      </StyledContainer>
    </StyledSection>
  )
}