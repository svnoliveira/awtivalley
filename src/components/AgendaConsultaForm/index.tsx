"use client";
import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgendaConsultaValues, AgendaConsultaSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection } from "./style";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export const AgendaConsultaForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendaConsultaValues>({
    resolver: zodResolver(AgendaConsultaSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: AgendaConsultaValues) => {
    const { userData } = userStore((store) => store);
    const userId = userData?.user.id;
    const userName = userData?.user.nome;
    const userPassaporte = userData?.user.passaporte;
    const discordID = userData?.user.discord_id;

    // Enviar mensagem de webhook para o Discord
    try {
      await axios.post('URL_DO_SEU_WEBHOOK_DO_DISCORD', {
        content: `:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n` +
        `# :bookmark_tabs: **Novo Currículo cadastrado:** :bookmark_tabs:\n\n` +
        `:mega: O Colaborador :busts_in_silhouette: ${discordID} **${userName}** | :identification_card: **${userPassaporte}** ID de cadastro: **${userId}** cadastrou um novo currículo\n\n` +
        `:busts_in_silhouette: **Nome:**  ${data.nome}\n` +
        `:identification_card: **Passaporte:** ${data.passaporte}\n` +
        `:mobile_phone: **Telefone:** ${data.telefone}\n` +
        `:mag_right: **Experiência:** ${data.experiencia}\n` +
        `:arrow_right: **Disponibilidade Entrevista:** ${data.disponibilidadeEntrevista}\n` +
        `:arrow_right: **Disponibilidade Trabalho:** ${data.disponibilidadeTrabalho}\n`,

      });
      console.log('Mensagem de webhook enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar mensagem de webhook:', error);
    }
    
    router.push('/login');
  };

  const checkError = () => {
    if (
      errors.nome ||
      errors.passaporte ||
      errors.telefone ||
      errors.experiencia ||
      errors.disponibilidadeEntrevista ||
      errors.disponibilidadeTrabalho
    ) {
      return true;
    }
    return false;
  };

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Link href="/">Voltar</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        />
        <span>Cadastrar de Currículos</span>
        <FormInput
          type="text"
          register={register("nome")}
          error={errors.nome}
        >
          Nome
        </FormInput>
        <FormInput
          type="text"
          register={register("passaporte")}
          error={errors.passaporte}
        >
          Passaporte
        </FormInput>
        <FormInput
          type="text"
          register={register("telefone", { pattern: /\d{3}-\d{3}/ })}
          error={errors.telefone}
        >
          Telefone (###-###)
        </FormInput>
        <FormInput
          type="text"
          register={register("experiencia")}
          error={errors.experiencia}
        >
          Experiência
        </FormInput>
        <FormInput
          type="text"
          register={register("disponibilidadeEntrevista")}
          error={errors.disponibilidadeEntrevista}
        >FieldError 
          Disponibilidade para entrevista
        </FormInput>
        <FormInput
          type="text"
          register={register("disponibilidadeTrabalho")}
          error={errors.disponibilidadeTrabalho}
        >
          Disponibilidade para trabalho
        </FormInput>
      </StyledForm>
    </StyledSection>
  );
};
