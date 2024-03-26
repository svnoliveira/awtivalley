"use client";

import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import { adminStore } from "@/stores/adminStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { StyledContainer } from "./style";
import { userStore } from "@/stores/userStore";
import axios from 'axios'; // Importe o Axios
const { DateTime } = require('luxon');

export const AdminEspecialidadesVincular = () => {
  const { adminActiveUser, adminActiveEspecialidade } = adminStore(
    (state) => state
  );
  const { addEspecialidade } = especialidadeStore((state) => state);

  const { userData } = userStore((store) => store);
 
  const userName = userData?.user.nome;
  const userPassaporte = userData?.user.passaporte;
  // Função para enviar o webhook
  const enviarWebhook = async () => {
    const horaBrasilia = DateTime.local().setZone('America/Sao_Paulo').toLocaleString(DateTime.TIME_24_SIMPLE) + ' ' + DateTime.local().setZone('America/Sao_Paulo').toFormat('dd/MM/yyyy');

    const webhookUrl = 'https://discord.com/api/webhooks/1209602152591527946/bS8k85czlDSOXNK5Bt_CItRjpZJ0AVDVfDiJXoU6cA5YfS4p2_0GjNk2E8xq-j9OxVHP';
    const imageUrl = "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";

    const mensagemWebhook = 
      `:mega: O Gestor :busts_in_silhouette: ${userName} || ${userPassaporte}\n\n` +
      `:white_check_mark: Registrado na Epscialidade: **${adminActiveEspecialidade?.nome}** para o colaborador **${adminActiveUser?.nome}**\n\n` +
      `:alarm_clock: às **${horaBrasilia}**\n` +
      `( ${imageUrl} )`; 
    
    try {
      await axios.post(webhookUrl, { content: mensagemWebhook });
    } catch (error) {
    }
  };
  return (
    <StyledContainer>
      {adminActiveEspecialidade ? (
        adminActiveUser ? (
          <p>
            Registrar colaborador {adminActiveUser?.nome}? à 
            Especialdiade: {adminActiveEspecialidade?.nome}
          </p>
        ) : (
          <p>Selecione um Colaborador.</p>
        )
      ) : (
        <p>Selecione um Especialdiade.</p>
      )}
      {adminActiveUser && adminActiveEspecialidade && (
        <StyledSubmitButton
          $error={false}
          onClick={async () => {
            await addEspecialidade(adminActiveEspecialidade, adminActiveUser);
            await enviarWebhook();
          }}
        >
          Registrar
        </StyledSubmitButton>
      )}
    </StyledContainer>
  );
};

