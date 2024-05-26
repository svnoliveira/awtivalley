import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgendaConsultaPsicotenicoValues, AgendaConsultaPsicotenicoSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection, StyledSelectWrapper } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';


export const AgendaConsultaPscotecnicoForm = () => {

  const [image, setImage] = useState<File | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgendaConsultaPsicotenicoValues>({
    resolver: zodResolver(AgendaConsultaPsicotenicoSchema),
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

  const onSubmit = async (data: AgendaConsultaPsicotenicoValues) => {
    try {
      let message = `:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n` +
                    `# :bookmark_tabs: **Nova consulta agendada:** :bookmark_tabs:\n\n` +
                    `:busts_in_silhouette: **Nome do paciente:**  ${data.nome}\n` +
                    `:identification_card: **Passaporte do paciente:** ${data.passaporte}\n` +
                    `:mobile_phone: **Telefone do paciente:** ${data.telefone}\n` +
                    `:mag_right: **Agendamento para:** <@&1183451159357300838>\n` +
                    `:arrow_right: **Disponibilidade para se consultar:** ${data.disponibilidadeConsulta}\n`;

      await axios.post('https://discord.com/api/webhooks/1227754852466163713/MPBiLDhnCNvFTvFldnl0bcloPMJ5L8kxDswIDdIkcdKoiua7MuKEIZEv8ebbXLo4YMpd', {
        content: message,
      });

      console.log('Mensagem de webhook enviada com sucesso!');

      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        setIsLoading(false);
        await axios.post('https://discord.com/api/webhooks/1227754852466163713/MPBiLDhnCNvFTvFldnl0bcloPMJ5L8kxDswIDdIkcdKoiua7MuKEIZEv8ebbXLo4YMpd', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            file: image.name
          }
        });

        console.log('Imagem enviada com sucesso!');
      }
      
      reset();
      setSuccessMessage("Agendamento de consulta realizado com sucesso!");
    } catch (error) {
      console.error('Erro ao enviar mensagem de webhook:', error);
    }
  };

  const checkError = () => {
    if (
      errors.nome ||
      errors.passaporte ||
      errors.telefone ||
      errors.disponibilidadeConsulta
    ) {
      return true;
    }
    return false;
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
        <span>Agendamento de Psicotécnico</span>
        <div>
        <FormInput
          type="text"
          register={register("nome")}
          error={errors.nome}
        >
          Nome do Paciente
        </FormInput>
        <FormInput
          type="text"
          register={register("passaporte")}
          error={errors.passaporte}
        >
          Passaporte do Paciente
        </FormInput>
        <FormInput
          type="text"
          register={register("telefone", { pattern: /\d{3}-\d{3}/ })}
          error={errors.telefone}
        >
          Telefone do Paciente
        </FormInput>        
        <FormInput
          type="text"
          register={register("disponibilidadeConsulta")}
          error={errors.disponibilidadeConsulta}
        >
          Disponibilidade para se consultar:
        </FormInput>
       
       <StyledSelectWrapper>
       <input type="file" onChange={handleImageChange} accept="image/*" />
       </StyledSelectWrapper>
       </div>
       <br></br>
       {isLoading ? (
          <p>Carregando...</p>
        ) : (
        <StyledSubmitButton $error={checkError()} type="submit">
          AGENDAR
        </StyledSubmitButton>
        )}
        
      </StyledForm>
    </StyledSection>
  );
};
