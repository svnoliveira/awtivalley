import { useState, useEffect } from 'react';
import { StyledForm, StyledSection, StyledSelectWrapper, GlobalStyle } from "./style";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RregisterchamadosValues, RregisterchamadosSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import ClickableImage from './ClickableImage';

export const RregisterchamadosForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [local, setLocal] = useState<string>('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RregisterchamadosValues>({
    resolver: zodResolver(RregisterchamadosSchema),
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

  const onSubmit = async (data: RregisterchamadosValues) => {
    setIsLoading(true); // Ativar estado de carregamento
    try {
      if (!image) {
        console.error('Por favor, selecione um arquivo.');
        setIsLoading(false); // Desativar estado de carregamento
        return; // Não envia o formulário se o arquivo não foi selecionado
      }

      const message = `:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n` +
        `# <a:alerta:1224848733871800431> <@&842486096826073114>\n\n` +
        `# :bookmark_tabs: **Chamado: ** :bookmark_tabs:\n\n` +
        `:busts_in_silhouette: **Local:**  ${data.Local}\n` +
        `:busts_in_silhouette: **Hora:**  ${data.Hora}\n` +
        `:identification_card: **Passaporte:** ${data.passaporte}\n`;

      await axios.post('https://discord.com/api/webhooks/1259869937124511794/I2n0MsUfm-0fioLZreqeSL0uEJyMN8qa0RJd-jcEK9yME2yaYbiws2nzoky5lwOvaybI', {
        content: message,
      });

      console.log('Mensagem de webhook enviada com sucesso!');

      const formData = new FormData();
      formData.append('file', image);

      await axios.post('https://discord.com/api/webhooks/1259869937124511794/I2n0MsUfm-0fioLZreqeSL0uEJyMN8qa0RJd-jcEK9yME2yaYbiws2nzoky5lwOvaybI', formData, {
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
    } finally {
      setIsLoading(false); // Desativar estado de carregamento
    }
  };

  const checkError = () => {
    return (
      !!errors.Local ||
      !!errors.passaporte ||
      !!errors.Hora
    );
  };

  const handleLocationClick = (location: string) => {
    setLocal(location);
    setValue("Local", location); // Atualizando o valor do campo oculto
  };

  return (
    <>
      <GlobalStyle />
      <StyledSection>
        {successMessage && <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginBottom: '10px' }}>{successMessage}</div>}
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Link href="/">Voltar</Link>
          <Image
            src="/cma-logo-black.png"
            alt="Logo awti valley"
            width={200}
            height={100}
          />
          <span>Relatar Chamado</span>
          <span>Clique na região do mapa para registrar o chamado. (Em cima do nome)</span>
          <ClickableImage src="/Map/map.gif" onClick={handleLocationClick} />
          <input type="hidden" {...register("Local")} />
          <FormInput
            type="text"
            register={register("Local")}
            error={errors.Local}
            defaultValue={local} // Passando o valor padrão
            disabled // Campo bloqueado para edição
          >
            Local do ocorrido
          </FormInput>
          <FormInput
            type="text"
            register={register("Hora")}
            error={errors.Hora}
          >
            Horario do Chamado
          </FormInput>
          <FormInput
            type="text"
            register={register("passaporte")}
            error={errors.passaporte}
          >
            Passaporte
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
              REGISTRAR
            </StyledSubmitButton>
          )}
        </StyledForm>
      </StyledSection>
    </>
  );
};
