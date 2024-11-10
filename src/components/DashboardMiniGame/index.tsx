import { DashboardMiniGameCard } from "@/fragments/DashboardMiniGameCard";
import { StyledContainer, StyledList, StyledSection } from "./style"
import { userStore } from "@/stores/userStore";
import Link from "next/link";
import { CheckFuncEstagiarioUserCursos, CheckFuncInternoUserCursos, CheckFuncParamedicoUserCursos, CheckFuncResidenteUserCursos, checkUserCursosRole, checkUserRole} from "@/utils/operations";


export const DashboardMiniGame = () => {
  return (
    <StyledSection>
      <StyledContainer>      
        <center><h1>asdasd</h1></center>
        <hr></hr>
        <hr></hr>
        <StyledList>
            <li>
              <Link href="/MiniGameCDA">
                <DashboardMiniGameCard iconUrl="/icons/icon_minigame.gif">MiniGame Teste de Agilidade</DashboardMiniGameCard>
              </Link>
            </li>
            <li>
              <Link href="/MiniGameCDARoleta">
                <DashboardMiniGameCard iconUrl="/icons/icon_minigame.gif">MiniGame Roleta da Sorte</DashboardMiniGameCard>
              </Link>
            </li>  
        </StyledList>
      </StyledContainer>
    </StyledSection>
  )
}