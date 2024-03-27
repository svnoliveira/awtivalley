import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  nome: string;
  passaporte: string;
  telefone: string;
  experiencia: string;
  disponibilidadeEntrevista: string;
  disponibilidadeTrabalho: string;
  imagem: File;
}

export const RegisterCurriculoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formattedTelefone, setFormattedTelefone] = useState("");

  const formatarTelefone = (input: string) => {
    // Remove tudo que não é dígito
    const cleaned = input.replace(/\D/g, "");
    // Aplica a formatação do telefone (###-###)
    const formatted = cleaned.replace(/(\d{3})(\d{3})/, "$1-$2");
    // Atualiza o estado com o número formatado
    setFormattedTelefone(formatted);
  };

  const onSubmit = (data: any) => {
    console.log(data); // Aqui você pode enviar os dados do formulário para onde for necessário
    sendToDiscord(data); // Chamada para a função que envia os dados para o Discord
  };

  const checkError = () => {
    if (
      errors.nome ||
      errors.passaporte ||
      errors.telefone ||
      errors.experiencia ||
      errors.disponibilidadeEntrevista ||
      errors.disponibilidadeTrabalho ||
      errors.imagem
    ) {
      return true;
    }
    return false;
  };

  // Função para enviar os dados para o Discord
  function sendToDiscord(data: FormData) {
    var webhookUrl = "https://discord.com/api/webhooks/1209602152591527946/bS8k85czlDSOXNK5Bt_CItRjpZJ0AVDVfDiJXoU6cA5YfS4p2_0GjNk2E8xq-j9OxVHP"; // Substitua pelo seu webhook URL

    var payload = {
      content: 
        ":heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n" +
        "# :bookmark_tabs: **Novo Currículo cadastrado:** :bookmark_tabs:\n" +
        ":busts_in_silhouette: **Nome:** " + data.nome + "\n" + // Ajuste para pegar os valores corretos
        ":identification_card: **Passaporte:** " + data.passaporte + "\n" + // Ajuste para pegar os valores corretos
        ":mobile_phone: **Telefone:** " + data.telefone + "\n" + // Ajuste para pegar os valores corretos
        ":mag_right: **Experiência:** " + data.experiencia + "\n" + // Ajuste para pegar os valores corretos
        ":arrow_right: **Disponibilidade Entrevista:** " + data.disponibilidadeEntrevista + "\n" + // Ajuste para pegar os valores corretos
        ":arrow_right: **Disponibilidade Trabalho:** " + data.disponibilidadeTrabalho + "\n", // Ajuste para pegar os valores corretos
      file: data.imagem
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Link href={"/"}>{"<"} Home</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        />
        <span>Cadastrar de Currículum</span>
        <div>
          <input
            type="text"
            {...register("nome", { required: true })}
            placeholder="Nome"
          />
          {errors.nome && <span>Nome é obrigatório</span>}
          
          <input
            type="text"
            {...register("passaporte", { required: true })}
            placeholder="Passaporte"
          />
          {errors.passaporte && <span>Passaporte é obrigatório</span>}
          
          <input
            type="text"
            value={formattedTelefone}
            onChange={(e) => formatarTelefone(e.target.value)}
            placeholder="Telefone (###-###)"
          />
          {errors.telefone && <span>Telefone é obrigatório e deve estar no formato ###-###</span>}
          
          <input
            type="text"
            {...register("experiencia", { required: true })}
            placeholder="Experiência"
            list="experienciaOptions"
          />
          {errors.experiencia && <span>Experiência é obrigatória</span>}
          
          <input
            type="text"
            {...register("disponibilidadeEntrevista", { required: true })}
            placeholder="Disponibilidade para entrevista"
          />
          {errors.disponibilidadeEntrevista && <span>Disponibilidade para entrevista é obrigatória</span>}
          
          <input
            type="text"
            {...register("disponibilidadeTrabalho", { required: true })}
            placeholder="Disponibilidade para trabalho"
          />
          {errors.disponibilidadeTrabalho && <span>Disponibilidade para trabalho é obrigatória</span>}
          
          <input
            type="file"
            {...register("imagem", { required: true })}
            accept="image/*"
          />
          {errors.imagem && <span>Imagem é obrigatória</span>}
          
          <StyledSubmitButton $error={checkError()} type="submit">
            CADASTRAR
          </StyledSubmitButton>

        </div>
      </StyledForm>
    </StyledSection>
  );
};

export default RegisterCurriculoForm;
