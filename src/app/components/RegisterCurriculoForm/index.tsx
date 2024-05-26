import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterCurriculoValues, registerCurriculoSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection, StyledSelectWrapper } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export const RegisterCurriculoForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterCurriculoValues>({
    resolver: zodResolver(registerCurriculoSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  };

  const onSubmit = async (data: TRegisterCurriculoValues) => {
    try {
      if (!image) {
        console.error('Por favor, selecione um arquivo.');
        return; // Não envia o formulário se o arquivo não foi selecionado
      }
      let message = `:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n` +
      `# <a:alerta:1223357938912067675> <@&1192311823211442207> | <@&1127323287060496408> <a:alerta:1223357938912067675>\n\n` +
      `# :bookmark_tabs: **Novo Currículo cadastrado: ** :bookmark_tabs:\n\n` +
      `:busts_in_silhouette: **Nome:**  ${data.nome}\n` +
      `:identification_card: **Passaporte:** ${data.passaporte}\n` +
      `:mobile_phone: **Telefone:** ${data.telefone}\n` +
      `:mag_right: **Experiência:** ${data.experiencia}\n` +
      `:arrow_right: **Disponibilidade Entrevista:** ${data.disponibilidadeEntrevista}\n` +
      `:arrow_right: **Disponibilidade Trabalho:** ${data.disponibilidadeTrabalho}\n`;

      await axios.post('https://discord.com/api/webhooks/1223430514342367443/KzoSeJ-iMWeo1Cj0Vip8DLbDjbZ35_L73vB-gQdYWYFIKziZofYwNgftr4bdbs2ECytK', {
        content: message,
      });

      console.log('Mensagem de webhook enviada com sucesso!');

      const formData = new FormData();
      formData.append('file', image);

        await axios.post('https://discord.com/api/webhooks/1223430514342367443/KzoSeJ-iMWeo1Cj0Vip8DLbDjbZ35_L73vB-gQdYWYFIKziZofYwNgftr4bdbs2ECytK', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            file: image.name
          }
        });
  
        console.log('Imagem enviada com sucesso!');
        
        reset(); // Limpar o formulário após o envio da mensagem e do arquivo
        setSuccessMessage("Currículo cadastrado com sucesso!");
      } catch (error) {
        console.error('Erro ao enviar mensagem de webhook:', error);
      }
    };

  const checkError = () => {
    return (
      !!errors.nome ||
      !!errors.passaporte ||
      !!errors.telefone ||
      !!errors.experiencia ||
      !!errors.disponibilidadeEntrevista ||
      !!errors.disponibilidadeTrabalho
    );
  };

  return (
    <StyledSection>
      {successMessage && <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginBottom: '10px' }}>{successMessage}</div>}
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
        >
          Disponibilidade para entrevista
        </FormInput>
        <FormInput
          type="text"
          register={register("disponibilidadeTrabalho")}
          error={errors.disponibilidadeTrabalho}
        >
          Disponibilidade para trabalho
        </FormInput>
        <StyledSelectWrapper>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </StyledSelectWrapper>
        <br />
        {image === null && <p style={{ color: 'red' }}>Por favor, selecione um arquivo.</p>}
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <StyledSubmitButton $error={checkError()} type="submit" disabled={isLoading}>
            CADASTRAR
          </StyledSubmitButton>
        )}
      </StyledForm>
    </StyledSection>
  );
};
