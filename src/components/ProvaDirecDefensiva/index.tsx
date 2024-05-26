import {   StyledSection,
  StyledContainer,
  StyledList,
  StyledListItem } from "./style";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import Link from "next/link";
import {
  CheckFuncEstagiarioUserCursos,
  CheckFuncInternoUserCursos,
  CheckFuncParamedicoUserCursos,
  CheckFuncResidenteUserCursos,
  checkUserCursosRole,
  checkUserRole,
} from "@/utils/operations";

export const ProvaDirecDefensiva = () => {
  const user = userStore((state) => state.userData?.user);
  return (
    <StyledSection>
      <StyledContainer>
        <center>
          <h1>Provas Direção Defensiva</h1>
        </center>
        <hr />
        <hr />
        <StyledList>
          
          <StyledListItem>
            <center><h2>🚑 Direção Defensiva</h2></center>
            <p>
              <strong>Prova Prática:</strong>
            </p>
            <ul>
              <li>➜ Você deverá seguir as instruções do avaliador para definir o percurso.</li>
              <li>➜ Deverá mandar uma print da viatura, no privado do Instrutor quando chegar no primeiro Check Point.</li>
              <li>➜ Instrutor depois de avaliar a print, liberar pro final da prova.</li>
            </ul>
            <hr></hr>
            <p>
              <strong>Observações:</strong>
            </p>
            <ul>
              <li>➜ Pode ir com qualquer viatura (Ambulância ou Carro de Resgate).</li>
              <li>➜ Sirene e Giroflex desligados.</li>
              <li>➜ Todo mundo na rádio CURSOHP ou a rádio definida no momento do teste.</li>
              <li>➜ Capotar, não conseguir completar o percurso, chegar no final sem porta, capô ou porta-malas, é REPROVADO.</li>
              <li>➜ Proibido usar kit de reparo.</li>
            </ul>
          </StyledListItem>
        </StyledList>
      </StyledContainer>
    </StyledSection>
  ); 
};
