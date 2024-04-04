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
  const [bonusEnabled, setBonusEnabled] = useState<{ [funcao: string]: { [nome: string]: boolean } }>({});
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

    if (( 
        funcao === "🚁 Inst. Chef Aéreo" ||
        funcao === "🚁 Inst. Aereo" ||
        funcao === "🚁 Aux. Aéreo" ||
        funcao === "🧾 Inst. Curso" ||
        funcao === "🧾 Aux. Curso" ||
        funcao === "🎉 Aux. Integração" ||
        funcao === "✒️  Aux. Ingresso" ||
        funcao === "👥 Aux. de Atendimento") &&
      bonusEnabled[funcao]
    ) {
      const bonus = horas >= 26280 + 720 ? 10000 : 75000;
      rate += bonus;
    } else if (
      (funcao === "🥼 Supervisor" ||
        funcao === "📋 Coordenador Geral" ||
        funcao === "🔖 Coordenador" ||
        funcao === "📋 Diretor Administrativo" ||
        funcao === "💼 Diretoria Geral") &&
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

  const toggleBonus = (funcao: string, nome: string) => {
    console.log(`Toggling bonus for: ${funcao}, ${nome}`);
    setBonusEnabled((prevBonusEnabled) => {
      const funcaoEnabled = prevBonusEnabled[funcao] || {}; // Obtém o objeto para a função especificada
      const updatedFuncaoEnabled = {
        ...funcaoEnabled,
        [nome]: !funcaoEnabled[nome] || false, // Inverte o estado do nome específico
      };
  
      const newBonusEnabled = {
        ...prevBonusEnabled,
        [funcao]: updatedFuncaoEnabled, // Atualiza o objeto da função com o novo estado
      };
  
      localStorage.setItem("bonusEnabled", JSON.stringify(newBonusEnabled)); // Salva no localStorage
      return newBonusEnabled; // Retorna o novo estado atualizado
    });
  };

  const sendMessageToDiscord = async (message: string, webhookUrl: string) => {
    try {
      await axios.post(webhookUrl, { content: message });
      console.log('Mensagem enviada com sucesso para o Discord!');
    } catch (error) {
      console.error('Erro ao enviar a mensagem para o Discord:', error);
    }
  };
  
  const sendTableToDiscord = () => {
    const webhookUrl1 = 'https://discord.com/api/webhooks/1223665624903847956/ooWuvYbaNyv-Ro656vYVxFw2T2QEUiRRf0nQlV8YPGEPRLS5VRqkG2D1UGH4Ztj6Gn74';
    const webhookUrl2 = 'https://discord.com/api/webhooks/1223423941759209522/vOhu-8lefF3Kjdnv1VxxFnRP5iPj1B7ODHRxDkRU1iULJV1UQu3G0Hb5EQUKFMp9ikNE';
    const webhookUrls = [webhookUrl1, webhookUrl2];
  
    const randomMessage = [
      `As bonificações caíram na conta como um meteoro de dinheiro!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Mais uma semana, mais uma chuva de bonificações!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `A conta está tão feliz que até os números estão dançando com as bonificações!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Alerta de surto de felicidade financeira: as bonificações chegaram!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `As bonificações são como a cereja no topo do sundae financeiro!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Dinheiro extra na conta - é como ganhar na loteria, mas com menos gritaria!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `A bonificação está aqui para transformar a conta bancária em um paraíso fiscal!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Recebendo as bonificações como se fosse o Papai Noel fazendo uma visita antecipada!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Mais uma vez, as bonificações estão aqui para fazer o saldo bancário sorrir!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `A conta bancária está tão feliz que está fazendo uma festa de fogos de artifício com as bonificações!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Dinheiro extra na conta - hora de fingir que sou rico por alguns dias!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `As bonificações chegaram - é como ganhar um presente surpresa, só que em forma de dinheiro!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Recebendo as bonificações como se fosse um tapinha nas costas do universo financeiro!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Alerta de tsunami de dinheiro: as bonificações estão inundando a conta!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `As bonificações chegaram - é como ganhar na loteria, mas sem precisar comprar o bilhete!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `A conta bancária está tão feliz que está fazendo uma dança da vitória com as bonificações!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Dinheiro extra na conta - é como encontrar um tesouro escondido no fundo do sofá!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `As bonificações estão aqui para transformar o saldo bancário em um oásis financeiro!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Recebendo as bonificações como se fosse um diploma de graduação em finanças!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Alerta de felicidade financeira: as bonificações estão causando uma explosão de alegria na conta!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
      `Mais uma semana, mais um depósito de felicidade financeira na conta!\n||<@&1127323287077265483> <@&1127323287077265480> <@&1127323287077265481> <@&1127323287077265484> <@&1127323287077265485> <@&1127323287077265486> ||`,
    ];
    const message = randomMessage[Math.floor(Math.random() * randomMessage.length)];
  
    sendMessageToDiscord(`# <:take_my_money91:1223427483601342635> BONIFICAÇÕES DA SEMANA ${adminActivePeriod?.start.toLocaleDateString()} até ${adminActivePeriod?.end.toLocaleDateString()} <:take_my_money91:1223427483601342635> <a:Dancing:1223427485501493348>\n${message}`, webhookUrls[0]);
  
    sendMessageToDiscord(`
    # <:take_my_money91:1223427483601342635> BONIFICAÇÕES DA SEMANA ${adminActivePeriod?.start.toLocaleDateString()} até ${adminActivePeriod?.end.toLocaleDateString()} <:take_my_money91:1223427483601342635> <a:Dancing:1223427485501493348>\n  
      <a:Dancing:1223427485501493348> **Total de Horas: ${totalHorasFormatted}** <a:Dancing:1223427485501493348>\n
      <a:pigmoney:1223427482074746991> **Total de Pagamento: <a:Money:1223427477334921267> ${totalValorFormatted}** <a:pigmoney:1223427482074746991>\n
      <a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348><a:Dancing:1223427485501493348>\n
      
      <a:alerta:1223357938912067675><a:alerta:1223357938912067675> **Caso queira veiricar a quantia de horas, acessar o painel** http://capital.centromedicoawti.com.br **com a conta ID:cdastaff SENHA: cdastaff, aba admin.\n
      ***💻Atenciosamente:. T.I CMA***
      `, webhookUrls[1]);
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
                        checked={bonusEnabled[user.funcao]?.[user.nome] || false}
                        onChange={() => toggleBonus(user.funcao, user.nome)}
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
