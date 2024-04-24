"use client";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { adminStore } from "@/stores/adminStore";
import { cursoStore } from "@/stores/cursoStore";
import { StyledButton, StyledContainer, StyledModal, StyledX } from "./style";
import { userStore } from "@/stores/userStore";
import axios from "axios"; // Importe o Axios
import { FormEvent, useState } from "react";
const { DateTime } = require("luxon");

export const GestaoCursosVincular = () => {
  const { adminActiveUser, adminActiveCurso } = adminStore((state) => state);
  const { addCurso } = cursoStore((state) => state);
  const { userData, loadUser } = userStore((store) => store);
  const [enrollModal, setEnrollModal] = useState(false);
  const [input, setInput] = useState<string>("");

  const userName = userData?.user.nome;
  const userPassaporte = userData?.user.passaporte;
  // Função para enviar o webhook
  
  const enviarWebhook = async () => {
    const horaBrasilia =
      DateTime.local()
        .setZone("America/Sao_Paulo")
        .toLocaleString(DateTime.TIME_24_SIMPLE) +
      " " +
      DateTime.local().setZone("America/Sao_Paulo").toFormat("dd/MM/yyyy");

      const webhookUrl = 'https://discord.com/api/webhooks/1198048319147081828/92dfDbbV89xAX72hIsEEbZe_IODYzNDtvFmaAJ0ml_wW7MobVelH-tc30o_xUWN4bJ4n';

    const imageUrl =
      "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";

    const mensagemWebhook =
      `:mega: O Instrutor :busts_in_silhouette: ${userName} || ${userPassaporte}\n\n` +
      `:white_check_mark: Registrado no Curso: **${adminActiveCurso?.nome}** para o colaborador **${adminActiveUser?.nome}**\n\n` +
      `:alarm_clock: às **${horaBrasilia}**\n` +
      `( ${imageUrl} )`;
    try {
      await axios.post(webhookUrl, { content: mensagemWebhook });
    } catch (error) {}
  };

  const handleEnrollClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await addCurso(adminActiveCurso!, adminActiveUser!, input);
    await loadUser();
    await enviarWebhook(); // Chame a função para enviar o webhook após adicionar o curso
  };

  return (
    <StyledContainer>
      {adminActiveCurso ? (
        adminActiveUser ? (
          <p>
            Registrar colaborador {adminActiveUser?.nome}? ao Curso:{" "}
            {adminActiveCurso?.nome}
          </p>
        ) : (
          <p>Selecione um Colaborador.</p>
        )
      ) : (
        <p>Selecione um curso.</p>
      )}
      {adminActiveUser && adminActiveCurso && (
        <StyledSubmitButton
          $error={false}
          onClick={() => {
            setEnrollModal(true);
          }}
        >
          Registrar Curso!
        </StyledSubmitButton>
      )}
      {enrollModal && (
        <StyledModal>
          <form onSubmit={(e) => handleEnrollClick(e)}>
          <div>
            <span>Vincule Curso : {adminActiveCurso?.nome} - </span>
            <span>ao colaborador : {adminActiveUser?.nome} -</span>
            <StyledX
              onClick={() => setEnrollModal(false)}
              type="button"
            >X</StyledX>
          </div>
            <span>Adicione o link do certificado:</span>
            <input
              type="text"
              placeholder="Digite link do certificado"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <StyledButton type="submit">Vincular</StyledButton>
          </form>
        </StyledModal>
      )}
    </StyledContainer>
  );
};
