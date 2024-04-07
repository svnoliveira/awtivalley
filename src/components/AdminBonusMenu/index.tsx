"use client";

import React, { useState, useEffect } from 'react';
import { AdminNav } from "@/globalStyles/AdminNav/style";
import { StyledTable, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { adminStore } from "@/stores/adminStore";
import { userStore } from "@/stores/userStore";
import {
  getTimeFromSeconds,
  getTotalSeconds,
  totalHoras,
} from "@/utils/operations";
import { StyledSection } from "./style";
import { AdminNavButton } from "@/globalStyles/AdminNavButton/style";

export const AdminBonusMenu = () => {
  const [bonusStatus, setBonusStatus] = useState<{ [userId: string]: boolean }>({});
  const userList = userStore((state) => state.userList);
  const { adminActivePeriod } = adminStore((state) => state);
  const [bonusLimit, setBonusLimit] = useState<number>(0);

  const toggleBonus = (userId: string) => {
    console.log("Toggling bonus for user:", userId);
    setBonusStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId], // Alternar o estado da bonificação
    }));
  };

  useEffect(() => {
    // Inicializar bonusStatus com uma entrada para cada usuário
    const initialBonusStatus: { [userId: string]: boolean } = {};
    userList.forEach((user) => {
      initialBonusStatus[user.id.toString()] = false; // Inicialmente, bonificação desativada para todos
    });
    setBonusStatus(initialBonusStatus);
  }, [userList]);

  const calculatePayment = (horas: number, cargo: string, funcao: string): number => {
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
    // Novas condições para outras funções
    if (
      funcao === "👥 Aux. de Atendimento" ||
      funcao === "✒️ Aux. Ingresso" || 
      funcao === "🎉 Aux. Integração" || 
      funcao === "🧾 Aux. Curso" ||
      funcao === "🧾 Inst. Curso" ||
      funcao === "🚁 Aux. Aéreo" || 
      funcao === "🚁 Inst. Aereo" || 
      funcao === "🚁 Inst. Chef Aéreo"      
  ) {
      if (horas >= 36000) {
          const bonus = 10000;
          rate += bonus;
      } else if (horas >= 26280 + 720) {
          const bonus = 75000;
          rate += bonus;
      }
  } else if (
      funcao === "🥼 Supervisor" || 
      funcao === "📋 Coordenador Geral" || 
      funcao === "🔖 Coordenador" || 
      funcao === "📋 Diretor Administrativo" || 
      funcao === "💼 Diretoria Geral"
  ) {
      if (horas >= 36000) {
          const bonus = 15000;
          rate += bonus;
      } else if (horas >= 26280 + 720) {
          const bonus = 11250;
          rate += bonus;
      }
  }
 
    return rate;
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filteredList = () => {
    return userList.filter((user) => {
      const registros = user.registros_de_ponto.filter((ponto) => {
        const testingData = new Date(ponto.entrada);
        return (
          testingData >= adminActivePeriod!.start &&
          testingData <= adminActivePeriod!.end
        );
      });

      const horas = totalHoras(
        registros,
        adminActivePeriod!.start,
        adminActivePeriod!.end
      );

      if (bonusLimit === 0) {
        return horas > 0; // Mostrar todos os usuários com horas registradas
      } else if (bonusLimit === 18000) {
        return horas >= 18000 && horas < 26279 + 720; // Mostrar usuários com 50% das horas (18000-26279)
      } else if (bonusLimit === 26280 + 720) {
        return horas >= 26280 + 720 && horas < 36000; // Mostrar usuários com 75% das horas (26280-35999)
      } else if (bonusLimit === 36000) {
        return horas >= 36000; // Mostrar usuários com 100% das horas (36000 ou mais)
      } else {
        return false; // Retornar false para qualquer outro valor de bonusLimit
      }
    });
  };

  return (
    <StyledSection>
      {!adminActivePeriod && (
        <p>Selecione Um Período para ver as listas de bonus</p>
      )}
      {adminActivePeriod && (
        <>
          <AdminNav>
            <AdminNavButton
              $selected={bonusLimit == 0 ? true : false}
              onClick={() => setBonusLimit(0)}
            >
              TODOS
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit == 36000 ? true : false}
              onClick={() => setBonusLimit(36000)}
            >
              100%
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit == 26280 + 720 ? true : false}
              onClick={() => setBonusLimit(26280 + 720)}
            >
              75%
            </AdminNavButton>
            <AdminNavButton
              $selected={bonusLimit == 18000 ? true : false}
              onClick={() => setBonusLimit(18000)}
            >
              50%
            </AdminNavButton>
          </AdminNav>
          <StyledTable>
            <thead>
              <tr>
                <ThTitleRow>Seq</ThTitleRow>
                <ThTitleRow>Colaborador</ThTitleRow>
                <ThTitleRow>Cargo</ThTitleRow>
                <ThTitleRow>Função</ThTitleRow>
                <ThTitleRow>Passaporte</ThTitleRow>
                <ThTitleRow>Horas</ThTitleRow>
                <ThTitleRow>$$ Pagamentos</ThTitleRow>
               {/*<ThTitleRow>Ativar/Desativar Bonificação</ThTitleRow>*/}
              </tr>
            </thead>
            <tbody>
              {filteredList()
                .sort(
                  (a, b) =>
                    getTotalSeconds(b.registros_de_ponto) -
                    getTotalSeconds(a.registros_de_ponto)
                )
                .map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
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
                              testingData >= adminActivePeriod!.start &&
                              testingData <= adminActivePeriod!.end
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
                                testingData >= adminActivePeriod!.start &&
                                testingData <= adminActivePeriod!.end
                              );
                            })
                          ),
                          user.cargo,
                          user.funcao
                        )
                      )}
                    </td>
                    {/*<td>
                      <button onClick={() => toggleBonus(user.id.toString())}>
                        {bonusStatus[user.id.toString()] ? "Desativar" : "Ativar"}
                      </button>
                    </td>*/}
                  </tr>
                ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </StyledSection>
  );
};