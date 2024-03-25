import { adminStore } from "@/stores/adminStore"
import { registroStore } from "@/stores/registroDePonto"
import { userStore } from "@/stores/userStore"
import { getTimeFromSeconds, sortByEntrada, totalHoras } from "@/utils/operations"
import { AdminDateSelector } from "../AdminDateSelector"
import { StyledTable, ThTitleRow } from "@/globalStyles/StyledTable/style"
import { StyledSection } from "./style"
import { AdminPontosModal } from "../AdminPontosModal"

export const AdminPontosMenu = () => {
  const userList = userStore((state) => state.userList);
  const { pontoList } = registroStore((state) => state);
  const { adminActiveUser, adminActivePeriod } = adminStore((state) => state);

  return (
    <StyledSection>
      <AdminDateSelector />
      <StyledTable>
        <thead>
          {adminActiveUser && adminActivePeriod && <tr><td colSpan={4}><b>Total de Horas</b></td><td>{getTimeFromSeconds(totalHoras(adminActiveUser.registros_de_ponto, adminActivePeriod.start, adminActivePeriod.end))}</td></tr>}
          <tr>
            <ThTitleRow>Colaborador</ThTitleRow>
            <ThTitleRow>Passaporte</ThTitleRow>
            <ThTitleRow>Entrada</ThTitleRow>
            <ThTitleRow>Saída</ThTitleRow>
            <ThTitleRow>Justificativa</ThTitleRow> {/* Nova coluna */}
            <ThTitleRow>Horas</ThTitleRow>
            <ThTitleRow>Ação</ThTitleRow>
          </tr>
        </thead>
        <tbody>
          {adminActiveUser ?
            adminActivePeriod ?
              <>                
                {adminActiveUser.registros_de_ponto
                  .filter((ponto) => {
                    const testingData = new Date(ponto.entrada);
                    return testingData >= adminActivePeriod.start && testingData <= adminActivePeriod.end;
                  })
                  .sort(sortByEntrada)
                  .map((ponto) => (
                    <tr key={ponto.id}>
                      <td>{adminActiveUser.nome}</td>
                      <td>{adminActiveUser.passaporte}</td>
                      <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                      <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                      <td>{ponto.justificativa || '-'}</td> {/* Exibir justificativa ou '-' se não houver */}
                      <td>{ponto.horas}</td>
                      <td><AdminPontosModal ponto={ponto}/></td>
                    </tr>
                  ))}
              </> :
              <>
                {adminActiveUser.registros_de_ponto.sort(sortByEntrada).map((ponto) =>
                  <tr key={ponto.id}>
                    <td>{adminActiveUser.nome}</td>
                    <td>{adminActiveUser.passaporte}</td>
                    <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                    <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                    <td>{ponto.justificativa || '-'}</td> {/* Exibir justificativa ou '-' se não houver */}
                    <td>{ponto.horas}</td>
                    <td><AdminPontosModal ponto={ponto}/></td>
                  </tr>
                )}
              </>
            :
            adminActivePeriod ?
              <>
                {pontoList.sort(sortByEntrada).map((ponto) => {
                  const testingData = new Date(ponto.entrada)
                  if (testingData >= adminActivePeriod.start &&
                    testingData <= adminActivePeriod.end) {
                    return <tr key={ponto.id}>
                      <td>{userList.find((user) => user.id === ponto.user)?.nome}</td>
                      <td>{userList.find((user) => user.id === ponto.user)?.passaporte}</td>
                      <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                      <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                      <td>{ponto.justificativa || '-'}</td> {/* Exibir justificativa ou '-' se não houver */}
                      <td>{ponto.horas}</td>
                      <td><AdminPontosModal ponto={ponto}/></td>
                    </tr>
                  }
                }
                )}
              </>
              :
              <>
                {pontoList.sort(sortByEntrada).map((ponto) => (
                  <tr key={ponto.id}>
                  <td>{userList.find((user) => user.id === ponto.user)?.nome}</td>
                    <td>{userList.find((user) => user.id === ponto.user)?.passaporte}</td>
                    <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                    <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                    <td>{ponto.justificativa || '-'}</td>
                    <td>{ponto.horas}</td>
                    <td><AdminPontosModal ponto={ponto}/></td>
                  </tr>
                ))}
              </>}
        </tbody>
      </StyledTable>
    </StyledSection>
  )
}
