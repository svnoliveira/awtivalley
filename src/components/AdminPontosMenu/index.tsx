'use client'

import { adminStore } from "@/stores/adminStore"
import { registroStore } from "@/stores/registroDePonto"
import { userStore } from "@/stores/userStore"
import { getTimeFromSeconds, sortByEntrada, totalHoras } from "@/utils/operations"
import { AdminDateSelector } from "../AdminDateSelector"


export const AdminPontosMenu = () => {
  const userList = userStore((state) => state.userList);
  const { pontoList } = registroStore((state) => state);
  const {
    adminActiveUser,
    adminActivePeriod
  } = adminStore((state) => state)

  return (
    <section>
      {!adminActiveUser && <h3>Selecione Um colaborador</h3>}
      {!adminActivePeriod && <h3>Selecione Um período</h3>}
      <AdminDateSelector />
      <table>
        <thead>
          <th>Colaborador</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Horas</th>
        </thead>
        <tbody>
          {adminActiveUser ?
            adminActivePeriod ?
              <>
                <tr><td>Total de Horas</td><td></td><td></td><td>{getTimeFromSeconds(totalHoras(adminActiveUser.registros_de_ponto, adminActivePeriod.start, adminActivePeriod.end))}</td></tr>
                {adminActiveUser.registros_de_ponto
                  .filter((ponto) => {
                    const testingData = new Date(ponto.entrada);
                    return testingData >= adminActivePeriod.start && testingData <= adminActivePeriod.end;
                  })
                  .sort(sortByEntrada)
                  .map((ponto) => (
                    <tr key={ponto.id}>
                      <td>{adminActiveUser.nome}</td>
                      <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                      <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                      <td>{ponto.horas}</td>
                    </tr>
                  ))}
              </> :
              <>
                {adminActiveUser.registros_de_ponto.sort(sortByEntrada).map((ponto) =>
                  <tr key={ponto.id}>
                    <td>{adminActiveUser.nome}</td>
                    <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                    <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                    <td>{ponto.horas}</td>
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
                      <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                      <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                      <td>{ponto.horas}</td>
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
                    <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                    <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                    <td>{ponto.horas}</td>
                  </tr>
                ))}
              </>}
        </tbody>
      </table>
    </section>
  )
}