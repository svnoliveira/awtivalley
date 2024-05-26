import axios from 'axios';
import { Loading } from "@/fragments/Loading";
import { IRegistroDePonto } from "@/stores/@registroDePontoTypes";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { useState } from "react";
import { StyledButtonContainer, StyledModal, StyledX } from "./style";
const { DateTime } = require('luxon');

interface IAdminPontosModalProps {
  ponto: IRegistroDePonto;
}

export const AdminPontosModal = ({ ponto }: IAdminPontosModalProps) => {
  const [modalOpen, setModalOpen] = useState<IRegistroDePonto | false>(false);
  const [loading, setLoading] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const deletePonto = registroStore((state) => state.deletePonto);
  const token = userStore((state) => state.userData?.accessToken);
  const userList = userStore((state) => state.userList);
  const { userData } = userStore((store) => store);
  const userId = userData?.user.id;
  const userName = userData?.user.nome;
  const userPassaporte = userData?.user.passaporte;
  const discordID = userData?.user.discord_id;
  const DiscordIDUsuario = userList.find((user) => user.id === ponto.user)?.nome;
  

  const handleDeleteClick = async () => {
    setLoading(true);
    await deletePonto(ponto.id, token!);
    setLoading(false);
    setModalOpen(false);

    const horaBrasilia = DateTime.local().setZone('America/Sao_Paulo').toLocaleString(DateTime.TIME_24_SIMPLE) + ' ' + DateTime.local().setZone('America/Sao_Paulo').toFormat('dd/MM/yyyy');

    // Enviar o webhook para o Discord após a exclusão do ponto
    const webhookUrl = 'https://discord.com/api/webhooks/1209602152591527946/bS8k85czlDSOXNK5Bt_CItRjpZJ0AVDVfDiJXoU6cA5YfS4p2_0GjNk2E8xq-j9OxVHP';
    const imageUrl = "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";

    const mensagemWebhook = 
    `:mega: O Colaborador :busts_in_silhouette: **${userName}** | :identification_card: **${userPassaporte}** ID de cadastro: **${userId}**\n\n` +
    `:x: Removeu o ponto do ${userList.find((user) => user.id === ponto.user)?.nome} | <@${DiscordIDUsuario}>\n` +
    `:x: Discord do Gestor: <@${discordID}>\n` +
    `:alarm_clock: Ponto Entrada: ${new Date(ponto.entrada).toLocaleString('pt-br')}\n` +
    `:alarm_clock: Ponto Saída: ${new Date(ponto.saida).toLocaleString('pt-br')}\n` +
    `:clipboard: Justificativa: ${justificativa}\n\n` +
    `:alarm_clock: às **${horaBrasilia}**` +
    `( ${imageUrl} )`;

    try {
      await axios.post(webhookUrl, { content: mensagemWebhook });
      console.log('Webhook enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setModalOpen(ponto)}>Remover</button>
      {modalOpen === ponto && (
        <StyledModal>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <StyledX onClick={() => setModalOpen(false)}>X</StyledX>
                <h1>Deletar ponto?</h1>
                <p>{userList.find((user) => user.id === ponto.user)?.nome}</p>
                <div>
                    <p>{new Date(ponto.entrada).toLocaleString('pt-br')}</p>
                    <p>{new Date(ponto.saida).toLocaleString('pt-br')}</p>
                </div>
                <textarea 
                  placeholder="Justificativa"
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                />
                <StyledButtonContainer>
                  <button onClick={() => handleDeleteClick()}>Deletar</button>
                  <button onClick={() => setModalOpen(false)}>Cancelar</button>
                </StyledButtonContainer>
              </>
            )}
          </div>
        </StyledModal>
      )}
    </>
  );
};
