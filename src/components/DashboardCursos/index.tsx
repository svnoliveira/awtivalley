import { DashboardCursosCard } from "@/fragments/DashboardCursosCards";
import { StyledContainer, StyledList, StyledSection } from "./style"
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { CheckFuncEstagiarioUserCursos, CheckFuncInternoUserCursos, CheckFuncParamedicoUserCursos, CheckFuncResidenteUserCursos, checkUserCursosRole, checkUserRole} from "@/utils/operations";


export const DashboardCursos = () => {
  const user = userStore((state) => state.userData?.user);

  return (
    <StyledSection>
      <StyledContainer>      
        <center><h1>Provas</h1></center>
        <hr></hr>
        <hr></hr>
        <StyledList>
          {/*{CheckFuncEstagiarioUserCursos(user) && <li><Link href={"/ProvaDirecDefen"}>
            <DashboardCursosCard iconUrl="/icons/hambulance.svg">Direção Defensiva</DashboardCursosCard>
          </Link></li>}
          {CheckFuncEstagiarioUserCursos(user) && <li><Link href={"/ProvaModCondMedConflitos"}>
            <DashboardCursosCard iconUrl="/icons/personspeaking.svg">Modulação, Conduta, Mediação de conflitos</DashboardCursosCard>
          </Link></li>}
          {CheckFuncEstagiarioUserCursos(user) && <li><Link href={"/ProvaNocoesMedicamentos"}>
            <DashboardCursosCard iconUrl="/icons/pill.svg">Noções sobre Medicamentos</DashboardCursosCard>
          </Link></li>}
          {CheckFuncEstagiarioUserCursos(user) && <li><Link href={"/ProvaAnatomiaBasica"}>
            <DashboardCursosCard iconUrl="/icons/anatomiabasica.svg">Anatomia Avançada</DashboardCursosCard>
          </Link></li>}

          {CheckFuncParamedicoUserCursos(user) && <li><Link href={"/ProvaAnamneseeDiagnosticos"}>
            <DashboardCursosCard iconUrl="/icons/anamnese.svg">Anamnese e Diagnósticos</DashboardCursosCard>
          </Link></li>}
          {CheckFuncParamedicoUserCursos(user) && <li><Link href={"/ProvaElaboracaodeLaudos"}>
            <DashboardCursosCard iconUrl="/icons/elaboracaolaudos.svg">Elaboração de Laudos</DashboardCursosCard>
          </Link></li>}
          {CheckFuncParamedicoUserCursos(user) && <li><Link href={"/ProvaResgateAereoeAquatico"}>
            <DashboardCursosCard iconUrl="/icons/helicopter.svg">Resgate Aéreo e Aquático</DashboardCursosCard>
          </Link></li>}

          {CheckFuncInternoUserCursos(user) && <li><Link href={"/ProvaAnatomiaAvancada"}>
            <DashboardCursosCard iconUrl="/icons/lung.svg">Anatomia Avançada</DashboardCursosCard>
          </Link></li>}
          {CheckFuncInternoUserCursos(user) && <li><Link href={"/ProvaCirurgiaBasica"}>
            <DashboardCursosCard iconUrl="/icons/knife.svg">Cirurgia Básica</DashboardCursosCard>
          </Link></li>}
          {CheckFuncInternoUserCursos(user) && <li><Link href={"/ProvaExamesLabETecdeColetas"}>
            <DashboardCursosCard iconUrl="/icons/microscope.svg">Exames Laboratoriais e Técnicas de Coletas</DashboardCursosCard>
          </Link></li>}*/}

        </StyledList>
      </StyledContainer>
    </StyledSection>
  )
}