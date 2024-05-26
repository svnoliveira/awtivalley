import axios from 'axios';
import { registroStore } from "@/stores/registroDePonto";
import { useForm } from "react-hook-form";
import { TPontoValues, pontoSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import { formatHorario } from "@/utils/operations";
import { Loading } from "@/fragments/Loading";
import Link from "next/link";
import { FormTextArea } from "../FormTextArea";

export const PontoForm = () => {
  const { addPonto, loading } = registroStore((store) => store);
  const { userData, loadUser } = userStore((store) => store);
  const userId = userData?.user.id;
  const userName = userData?.user.nome;
  const userPassaporte = userData?.user.passaporte;
  const discordID = userData?.user.discord_id;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TPontoValues>({
    resolver: zodResolver(pontoSchema),
  });

  const parsePontoData = async (formData: TPontoValues) => {
    const pontoData = {
      entrada: formatHorario(formData.entrada) || "",
      saida: formatHorario(formData.saida) || "",
      justificativa: formData.justificativa || "-",
    };

    await addPonto(pontoData, userId!);
    loadUser;
    
    // Enviar webhook para o Discord
    const webhookUrl = 'https://discord.com/api/webhooks/1209602152591527946/bS8k85czlDSOXNK5Bt_CItRjpZJ0AVDVfDiJXoU6cA5YfS4p2_0GjNk2E8xq-j9OxVHP';
      // URL da imagem que você deseja adicionar
    var imageUrl = "https://media.discordapp.net/attachments/842486097368055868/1190037415813971988/alta_linhas_2.png?ex=65bc0735&is=65a99235&hm=8fbef0f34063389dcd7ea427d38ad4bd12501a5bddbc31381744cc18edd3acd1&format=webp&quality=lossless&";
             
    var mensagemWebhook = `## :alarm_clock: **Novo registro de ponto:** :alarm_clock:\n\n` +
      `# :card_index: **CAD:** ${userId}\n` +
      `# :card_index: **Discord:** <@${discordID}>\n` +
      `# :busts_in_silhouette: **NOME:** ${userName}\n` +
      `# :identification_card: **PASSAPORTE:** ${userPassaporte}\n` +
      `**:alarm_clock: Ponto de Entrada:** ${pontoData.entrada}}\n` +
      `**:alarm_clock: Ponto de Saída:** ${pontoData.saida}\n` +
      `**:notepad_spiral: Justificativa:** ${pontoData.justificativa}\n` +
      `( ${imageUrl} )`;  // Adiciona a imagem à mensagem

    try {
      await axios.post(webhookUrl, { content: mensagemWebhook });
      console.log('Webhook enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
  };

  useEffect(() => {
    reset({
      entrada: "",
      saida: "",
      justificativa: "",
    });
  }, [isSubmitSuccessful]);

  const checkError = () => {
    if (errors.entrada || errors.saida) {
      return true;
    }
    return false;
  };

  return (
    <StyledSection>
      <StyledForm
        onSubmit={handleSubmit((formData) => parsePontoData(formData))}
      >
        <Link href={"/"}>{"<"} Home</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        ></Image>
        <span>Registro de Ponto</span>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              <FormTextArea
                type="text"
                register={register("entrada")}
                error={errors.entrada}
              >
                Entrada
              </FormTextArea>
              <FormTextArea
                type="text"
                register={register("saida")}
                error={errors.entrada}
              >
                Saída
              </FormTextArea>
              <FormTextArea
                type="text"
                register={register("justificativa")}
                error={errors.justificativa}
              >
                Justificativa
              </FormTextArea>
            </div>
            <StyledSubmitButton $error={checkError()} type="submit">
              REGISTRAR PONTO
            </StyledSubmitButton>
          </>
        )}
      </StyledForm>
    </StyledSection>
  );
};
