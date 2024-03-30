import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { StyledTable, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore";
import {
  getTimeFromSeconds,
  getTotalSeconds,
  totalHoras,
} from "@/utils/operations";
import { StyledSection, RightContainer, StyledButton } from "./style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";

export const AdminBonusMenu = () => {
  const userList = userStore((state) => state.userList);
  const { adminActivePeriod } = adminStore((state) => state);
  const [bonusLimit, setBonusLimit] = useState<number>(0);
  const [bonusEnabled, setBonusEnabled] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [totalHorasFormatted, setTotalHorasFormatted] = useState<string>('');
  const [totalValorFormatted, setTotalValorFormatted] = useState<string>('');

  useEffect(() => {
    const storedBonusEnabled = localStorage.getItem("bonusEnabled");
    if (storedBonusEnabled) {
      setBonusEnabled(JSON.parse(storedBonusEnabled));
    }
  }, []);

  const calculatePayment = (
    horas: number,
    cargo: string,
    funcao: string
  ): number => {
    let rate = 0;
    if (horas >= 36000) {
      switch (cargo) {
        case "📚 Estagiário":
          rate = 30000;
          break;
        case "💉 Enfermagem":
          rate = 40000;
          break;
        case "🧪 Interno":
          rate = 50000;
          break;
        case "⚗️ Residente":
          rate = 60000;
          break;
        case "🔬 Médico":
          rate = 70000;
          break;
        default:
          break;
      }
    } else if (horas >= 26280 + 720) {
      switch (cargo) {
        case "📚 Estagiário":
          rate = 22500;
          break;
        case "💉 Enfermagem":
          rate = 30000;
          break;
        case "🧪 Interno":
          rate = 37500;
          break;
        case "⚗️ Residente":
          rate = 45000;
          break;
        case "🔬 Médico":
          rate = 52500;
          break;
        default:
          break;
      }
    }

    if (
      (funcao === "Inst. Aereo" ||
        funcao === "Int. Cursos" ||
        funcao === "Aux. Curso" ||
        funcao === "Aux. Ingresso") &&
      bonusEnabled[funcao]
    ) {
      const bonus = horas >= 26280 + 720 ? 10000 : 75000;
      rate += bonus;
    } else if (
      (funcao === "Supervisor" ||
        funcao === "Coordenador Geral" ||
        funcao === "Coordenador" ||
        funcao === "Diretoria Geral") &&
      bonusEnabled[funcao]
    ) {
      const bonus = horas >= 26280 + 720 ? 15000 : 11250;
      rate += bonus;
    }
    return rate;
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  useEffect(() => {
    const filteredListData = filteredList();
    const totalHorasFiltered = filteredListData.reduce((acc, user) => {
      return acc + getTotalSeconds(
        user.registros_de_ponto.filter((ponto) => {
          const testingData = new Date(ponto.entrada);
          return (
            adminActivePeriod &&
            testingData >= adminActivePeriod.start &&
            testingData <= adminActivePeriod.end
          );
        })
      );
    }, 0);
    const totalValorFiltered = filteredListData.reduce((acc, user) => {
      return acc + calculatePayment(
        getTotalSeconds(
          user.registros_de_ponto.filter((ponto) => {
            const testingData = new Date(ponto.entrada);
            return (
              adminActivePeriod &&
              testingData >= adminActivePeriod.start &&
              testingData <= adminActivePeriod.end
            );
          })
        ),
        user.cargo,
        user.funcao
      );
    }, 0);
    const totalHorasFormatted = getTimeFromSeconds(totalHorasFiltered);
    const totalValorFormatted = formatCurrency(totalValorFiltered);
    setTotalHorasFormatted(totalHorasFormatted);
    setTotalValorFormatted(totalValorFormatted);
  }, [adminActivePeriod, bonusEnabled]);

  const filteredList = () => {
    return userList.filter((user) => {
      const registros = user.registros_de_ponto.filter((ponto) => {
        const testingData = new Date(ponto.entrada);
        return (
          adminActivePeriod &&
          testingData >= adminActivePeriod.start &&
          testingData <= adminActivePeriod.end
        );
      });

      const horas = totalHoras(
        registros,
        adminActivePeriod ? adminActivePeriod.start : new Date(),
        adminActivePeriod ? adminActivePeriod.end : new Date()
      );

      if (bonusLimit === 0) {
        return horas > 0;
      } else if (bonusLimit === 18000) {
        return horas >= 18000 && horas < 26279 + 720;
      } else if (bonusLimit === 26280 + 720) {
        return horas >= 26280 + 720 && horas < 36000;
      } else if (bonusLimit === 36000) {
        return horas >= 36000;
      } else {
        return false;
      }
    });
  };

  const toggleBonus = (funcao: string) => {
    setBonusEnabled((prevBonusEnabled) => {
      const newBonusEnabled = {
        ...prevBonusEnabled,
        [funcao]: !prevBonusEnabled[funcao],
      };
      localStorage.setItem("bonusEnabled", JSON.stringify(newBonusEnabled));
      return newBonusEnabled;
    });
  };

  const sendMessageToDiscord = async (message: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1223423941759209522/vOhu-8lefF3Kjdnv1VxxFnRP5iPj1B7ODHRxDkRU1iULJV1UQu3G0Hb5EQUKFMp9ikNE';
    try {
      await axios.post(webhookUrl, { content: message });
      console.log('Mensagem enviada com sucesso para o Discord!');
    } catch (error) {
      console.error('Erro ao enviar a mensagem para o Discord:', error);
    }
  };

  const sendTableToDiscord = () => {
    const filteredTable = filteredList()
      .sort(
        (a, b) =>
          getTotalSeconds(b.registros_de_ponto) -
          getTotalSeconds(a.registros_de_ponto)
      )
      .map((user) => {
        return `
        # <:take_my_money91:1223427483601342635> BONIFICAÇÕES DA SEMANA <:take_my_money91:1223427483601342635> <a:Dancing:1223427485501493348>
        :busts_in_silhouette: **Colaborador: ${user.nome}**
        :identification_card: **Cargo: ${user.cargo}**
        <a:arrowr:1223426398878961786> **Função: ${user.funcao}**
        :identification_card: **Passaporte: ${user.passaporte}**
        :alarm_clock: **Horas:** ${getTimeFromSeconds(
            getTotalSeconds(
              user.registros_de_ponto.filter((ponto) => {
                const testingData = new Date(ponto.entrada);
                return (
                  adminActivePeriod &&
                  testingData >= adminActivePeriod.start &&
                  testingData <= adminActivePeriod.end
                );
                
              })
            )
          )}
          
          <a:grinders_man83:1223427475632033813> Pagamento: ${formatCurrency(
            calculatePayment(
              getTotalSeconds(
                user.registros_de_ponto.filter((ponto) => {
                  const testingData = new Date(ponto.entrada);
                  return (
                    adminActivePeriod &&
                    testingData >= adminActivePeriod.start &&
                    testingData <= adminActivePeriod.end
                  );
                                  
                })
              ),
              user.cargo,
              user.funcao
            )
          )}
          `;
      })
      .join('\n');

    sendMessageToDiscord(filteredTable + `\n
    <a:Dancing:1223427485501493348> **Total de Horas: ${totalHorasFormatted}** <a:Dancing:1223427485501493348>\n
    <a:pigmoney:1223427482074746991> **Total de Pagamento: <a:Money:1223427477334921267> ${totalValorFormatted}** <a:pigmoney:1223427482074746991>\n
    <a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348>
    `);
  };

return (
  <StyledSection>
    {!adminActivePeriod && <p>Selecione um período para ver as listas de bônus.</p>}
    {adminActivePeriod && (
      <>
        <AdminNav>
            <AdminNavButton
              $selected={bonusLimit === 0}
              onClick={() => setBonusLimit(0)}
            >
              TODOS
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit === 36000}
              onClick={() => setBonusLimit(36000)}
            >
              100%
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit === 26280 + 720}
              onClick={() => setBonusLimit(26280 + 720)}
            >
              75%
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit === 18000}
              onClick={() => setBonusLimit(18000)}
            >
              50%
            </AdminNavButton>
          </AdminNav>
          <div>
          <StyledButton onClick={sendTableToDiscord}>
          Enviar infos para o Discord
          </StyledButton>
          <RightContainer>
          <p><center>Total de Horas: {totalHorasFormatted}</center></p>
          <p><center>Total de Pagamento: {totalValorFormatted}</center></p>
          </RightContainer>
          </div>
          <StyledTable>
            <thead>
              <tr>
                <ThTitleRow>Colaborador</ThTitleRow>
                <ThTitleRow>Cargo</ThTitleRow>
                <ThTitleRow>Função</ThTitleRow>
                <ThTitleRow>Passaporte</ThTitleRow>
                <ThTitleRow>Horas</ThTitleRow>
                <ThTitleRow>$$ Pagamentos</ThTitleRow>
                <ThTitleRow>Ação</ThTitleRow>
              </tr>
            </thead>
            <tbody>
              {filteredList()
                .sort(
                  (a, b) =>
                    getTotalSeconds(b.registros_de_ponto) -
                    getTotalSeconds(a.registros_de_ponto)
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.cargo}</td>
                    <td>{user.funcao}</td>
                    <td>{user.passaporte}</td>
                    <td>
                      {getTimeFromSeconds(
                        getTotalSeconds(
                          user.registros_de_ponto.filter((ponto) => {
                            const testingData = new Date(ponto.entrada);
                            return (
                              adminActivePeriod &&
                              testingData >= adminActivePeriod.start &&
                              testingData <= adminActivePeriod.end
                            );
                          })
                        )
                      )}
                    </td>
                    <td>
                      {formatCurrency(
                        calculatePayment(
                          getTotalSeconds(
                            user.registros_de_ponto.filter((ponto) => {
                              const testingData = new Date(ponto.entrada);
                              return (
                                adminActivePeriod &&
                                testingData >= adminActivePeriod.start &&
                                testingData <= adminActivePeriod.end
                              );
                            })
                          ),
                          user.cargo,
                          user.funcao
                        )
                      )}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={bonusEnabled[user.funcao]}
                          onChange={() => toggleBonus(user.funcao)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </StyledSection>
  );
};
