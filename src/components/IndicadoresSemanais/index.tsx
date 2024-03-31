"use client";
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";
import { registroStore } from "@/stores/registroDePonto";
import {
  formatDate,
  getTimeFromSeconds,
  getTotalSeconds,
} from "@/utils/operations";
import { useEffect, useState } from "react";
import { StyledBonusCard, StyledInfo, StyledTitle } from "./style";
import { userStore } from "@/stores/userStore";

export const IndicadoresSemanais = () => {
  const { indicadorMenu } = registroStore((state) => state);
  const userPontoList = userStore((state) => state.userData?.user.registros_de_ponto);
  const data = new Date();
  const hoje = data.getDay();
  const inicioDaSemana = new Date(
    data.setDate(data.getDate() - hoje)
  ).toLocaleDateString("pt-br");
  const fimDaSemana = new Date(
    data.setDate(data.getDate() + 6)
  ).toLocaleDateString("pt-br");
  const [horasCumpridas, setHorasCumpridas] = useState(0);

  function gerarStatusSemanal(pontoList: IRegistroDePonto[]) {
    let hours: { horas: string }[] = [];
    const maxData = new Date(formatDate(fimDaSemana));
    const minData = new Date(formatDate(inicioDaSemana));
    pontoList.forEach((entry) => {
      const testingData = new Date(entry.entrada);
      if (testingData >= minData && testingData <= maxData) {
        hours.push({ horas: entry.horas });
      }
    });
    setHorasCumpridas(getTotalSeconds(hours));
  }

  useEffect(() => {
    const loadStatus = () => {
      userPontoList && gerarStatusSemanal(userPontoList);
    };
    loadStatus();
  }, [userPontoList, indicadorMenu]); // Adicionado indicadorMenu como dependência
  

  const getBonusStatus = () => {
    if (horasCumpridas >= 0) {
      if (horasCumpridas > 36000) {
        return "Bonificação alcançada 100%.";
      } else if (horasCumpridas >= 26280 + 720 && horasCumpridas <= 35999) {
        return "Bonificação alcançada 75%.";
      } else if (horasCumpridas >= 18000 && horasCumpridas <= 26279 + 720) {
        return "Bonificação alcançada 50%.";
      } else {
        return "Bonificação não alcançada.";
      }
    }
  };
  const getBonusStyle = () => {
    if (horasCumpridas >= 0) {
      if (horasCumpridas > 36000) {
        return "100%";
      } else if (horasCumpridas >= 26280 && horasCumpridas <= 35999) {
        return "75%";
      } else if (horasCumpridas >= 18000 && horasCumpridas <= 26279 + 720) {
        return "50%";
      } else {
        return "0%";
      }
    }
  };

  return (
    <>
      {indicadorMenu !== "ponto" && (
        <section>
          <StyledBonusCard $bonus={getBonusStyle()}>
            <div>
              <StyledTitle>
                <p>{getBonusStyle()}</p>
                <h3>{getBonusStatus()}</h3>
              </StyledTitle>
              <StyledInfo>
                <span>Semana Atual:</span>
                <span>
                  {inicioDaSemana} - {fimDaSemana}
                </span>
              </StyledInfo>
              <StyledInfo>
                {horasCumpridas > 36000 ? (
                  <span>Número de horas semanais alcançado.</span>
                ) : (
                  <>
                    <span>Horas restantes para finalizar na semana:</span>
                    <span>{getTimeFromSeconds(36000 - horasCumpridas)}</span>
                  </>
                )}
              </StyledInfo>
              <StyledInfo>
                <span>Horas trabalhadas:</span>
                <span>{getTimeFromSeconds(horasCumpridas)}</span>
              </StyledInfo>
            </div>
          </StyledBonusCard>
        </section>
      )}
    </>
  );
};
