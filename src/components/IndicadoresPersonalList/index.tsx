"use client";

import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { IndicadoresPontoCard } from "../IndicadoresPontoCard";
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";
import { useForm } from "react-hook-form";
import { TIndicadorValues, indicadorSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroStore } from "@/stores/registroDePonto";
import {
  getTimeFromSeconds,
  getTotalSeconds,
  sortByEntrada,
} from "@/utils/operations";
import { StyledUserBanner } from "../DashboardCard/style";
import { MenuNav } from "@/globalStyles/MenuNav/style";
import { MenuButton } from "@/globalStyles/MenuButton/style";
import { StyledContainer, StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { StyledTable, ThTitleRow } from "@/globalStyles/StyledTable/style";
import { IndicadoresSemanais } from "../IndicadoresSemanais";

export const IndicadoresPersonalList = () => {
  const user = userStore((state) => state.userData?.user);
  const { pontoList, loadPontos, indicadorMenu, setIndicadorMenu } =
    registroStore((state) => state);
  const userPontoList = pontoList.filter((ponto) => ponto.user === user?.id);
  const [dateList, setDateList] = useState<IRegistroDePonto[]>([]);
  const [totalHours, setTotalHours] = useState<string>("");

  useEffect(() => {
    const loadList = () => {
      if (user) {
        loadPontos();
        const list = userPontoList;
        setDateList(list);
      }
    };
    loadList();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TIndicadorValues>({
    resolver: zodResolver(indicadorSchema),
  });

  const parseData = async ({ entrada, saida }: TIndicadorValues) => {
    user && setDateList([...userPontoList]);
    let newList: IRegistroDePonto[] = [];
    const start = new Date(entrada + " 00:00:00");
    const end = new Date(saida + " 00:00:00");
    end.setDate(end.getDate() + 1);

    userPontoList.map((date) => {
      const currentDateStart = new Date(date.entrada);
      if (currentDateStart <= end && currentDateStart >= start) {
        newList.push(date);
      }
    });
    if (newList.length > 0) {
      const totalSeconds = getTotalSeconds(newList);
      const totalHours = getTimeFromSeconds(totalSeconds);
      setTotalHours(totalHours);
    } else {
      setTotalHours("");
    }
    setDateList([...newList]);
  };

  return (
    <StyledSection>
      <StyledUserBanner>
        <h1>
          Bem Vindo{"(a)"} {user?.nome} {"|"} {user?.passaporte}
        </h1>
      </StyledUserBanner>
      <MenuNav>
        <MenuButton
          $selected={indicadorMenu === "semanal" ? true : false}
          onClick={() => setIndicadorMenu("semanal")}
        >
          Status Semanal
        </MenuButton>
        <MenuButton
          $selected={indicadorMenu === "ponto" ? true : false}
          onClick={() => setIndicadorMenu("ponto")}
        >
          Pontos Registrados
        </MenuButton>
      </MenuNav>
      <IndicadoresSemanais />
      {indicadorMenu === "ponto" && (
        <StyledContainer>
        <StyledTable>
          <thead>
            <tr>
              <ThTitleRow>Entrada</ThTitleRow>
              <ThTitleRow>Saída</ThTitleRow>
              <ThTitleRow>Horas Trabalhadas</ThTitleRow>
              <ThTitleRow>Justificativa</ThTitleRow>
            </tr>
          </thead>
          <tbody>
            {dateList.sort(sortByEntrada).map((ponto) => (
              <tr key={ponto.id}>
                <td>{new Date(ponto.entrada).toLocaleString('pt-br')}</td>
                <td>{new Date(ponto.saida).toLocaleString('pt-br')}</td>
                <td>{ponto.justificativa || '-'}</td>
                <td>{ponto.horas}</td>
                <td>{ponto.horas}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
          <StyledForm
            onSubmit={handleSubmit((formData) => parseData(formData))}
            >
            <h3>Filtrar por data:</h3>
              <div>
                <span>Início:</span>
                <input type="date" {...register("entrada")} />
              </div>
                {errors && <p>{errors.entrada?.message}</p>}
              <div>
                <span>Fim:</span>
                <input type="date" {...register("saida")} />
              </div> 
                {errors && <p>{errors.saida?.message}</p>}
                {totalHours && <h3>Total de horas: {totalHours}</h3>}
            <StyledSubmitButton
              $error={errors.entrada ? true : errors.saida ? true : false}
              type="submit"
            >
              Filtrar
            </StyledSubmitButton>
          </StyledForm>
        </StyledContainer>
      )}
    </StyledSection>
  );
};
