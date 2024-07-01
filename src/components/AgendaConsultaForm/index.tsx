import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgendaConsultaValues, AgendaConsultaSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection, StyledSelectWrapper } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';


export const AgendaConsultaForm = () => {

  const [image, setImage] = useState<File | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgendaConsultaValues>({
    resolver: zodResolver(AgendaConsultaSchema),
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

  const onSubmit = async (data: AgendaConsultaValues) => {
    try {
      let message = `:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n` +
                    `# :bookmark_tabs: **Nova consulta agendada:** :bookmark_tabs:\n\n` +
                    `:busts_in_silhouette: **Nome do paciente:**  ${data.nome}\n` +
                    `:identification_card: **Passaporte do paciente:** ${data.passaporte}\n` +
                    `:mobile_phone: **Telefone do paciente:** ${data.telefone}\n` +
                    `:mag_right: **Consulta para o Especialista:** ${data.especialista}\n` +
                    `:arrow_right: **Motivo da Consulta:** ${data.motivoConsulta}\n` +
                    `:arrow_right: **Disponibilidade para se consultar:** ${data.disponibilidadeConsulta}\n`;

      /* ESPECIALIDADES */
      if (data.especialista === 'Anestesiologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185095> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Biomedicina') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185095> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Cirurgia Plástica') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185091> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Dermatologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185089> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Endocrinologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185088> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Epidemiologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185087> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Enfermagem') {
        message += `# <a:alerta:1223357938912067675> <@&1127323287077265481> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Fonoaudiologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833217> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Gastroenterologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833216> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Geriatria') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833215> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Genética Médica') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833214> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Hematologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833212> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Infectologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833211> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Massoterapia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833209> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Med. de Família e Com.') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286959833208> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Medicina Esportiva') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088477> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Medicina Veterinária') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286485876816> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Neurocirurgia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088476> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Neurofisioterapia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088475> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Neurologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088474> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Neuropsicanálise') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088473> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Nutrição') {
        message += `# <a:alerta:1223357938912067675> <@&1127323287077265487> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Obstetrícia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088471> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Odontologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088470> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Ortopedia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088468> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Otorrinolaringologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910416> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Pneumologia') {
        message += `# <a:alerta:1223357938912067675> <@&1130630230487335043> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Proctologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910413> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Quiropraxia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910410> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Radiologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910409> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Sexologia') {
        message += `# <a:alerta:1223357938912067675> <@&1128468781031759903> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Urologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910407> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Alergia e Imunologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323287035334746> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Nutrologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088472> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Fisioterapia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185086> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Oftalmologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286922088469> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Clínica Geral') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185090> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Psiquiatria') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910411> <a:alerta:1223357938912067675>`;
      }  else if (data.especialista === 'Psicologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910412> <a:alerta:1223357938912067675>`;        
      }else if (data.especialista === 'Patologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910415> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Cardiologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185093> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Cirurgia Geral') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286989185092> <a:alerta:1223357938912067675>`;
      } else if (data.especialista === 'Traumatologia') {
        message += `# <a:alerta:1223357938912067675> <@&1127323286896910408> <a:alerta:1223357938912067675>`;
      }
      /* FIM ESPECIALIDADES */

      await axios.post('https://discord.com/api/webhooks/1223431294159945849/WlNUpUDfo8O3dqQVNHJKheOBJ0hoKHA16HzMfE-16zMAsARxgSs3MD6dhIv_QiODyraX', {
        content: message,
      });

      console.log('Mensagem de webhook enviada com sucesso!');

      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        setIsLoading(false);
        await axios.post('https://discord.com/api/webhooks/1223431294159945849/WlNUpUDfo8O3dqQVNHJKheOBJ0hoKHA16HzMfE-16zMAsARxgSs3MD6dhIv_QiODyraX', formData, {
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
      errors.especialista ||
      errors.motivoConsulta ||
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
        <span>Agendamento de consultas</span>
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
        <StyledSelectWrapper>
          <div>
          <label htmlFor="especialista">Consulta para o Especialista</label>
          <select {...register("especialista")} id="especialista">
            <option value="">Selecione o especialista</option>
            <option value="Anestesiologia">Anestesiologia</option>
            <option value="Biomedicina">Biomedicina</option>
            <option value="Biotecnologia">Biotecnologia</option>
            <option value="Cirurgia Plástica">Cirurgia Plástica</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Endocrinologia">Endocrinologia</option>
            <option value="Epidemiologia">Epidemiologia</option>
            <option value="Enfermagem">Enfermagem</option>
            <option value="Fonoaudiologia">Fonoaudiologia</option>
            <option value="Gastroenterologia">Gastroenterologia</option>
            <option value="Geriatria">Geriatria</option>
            <option value="Genética Médica">Genética Médica</option>
            <option value="Ginecologia">Ginecologia</option>
            <option value="Hematologia">Hematologia</option>
            <option value="Infectologia">Infectologia</option>
            <option value="Massoterapia">Massoterapia</option>
            <option value="Med. de Família e Com.">Med. de Família e Com.</option>
            <option value="Medicina Esportiva">Medicina Esportiva</option>
            <option value="Medicina Veterinária">Medicina Veterinária</option>
            <option value="Neurocirurgia">Neurocirurgia</option>
            <option value="Neurofisioterapia">Neurofisioterapia</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Neuropsicanálise">Neuropsicanálise</option>
            <option value="Nutrição">Nutrição</option>
            <option value="Obstetrícia">Obstetrícia</option>
            <option value="Odontologia">Odontologia</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Otorrinolaringologia">Otorrinolaringologia</option>
            <option value="Pneumologia">Pneumologia</option>
            <option value="Proctologia">Proctologia</option>
            <option value="Quiropraxia">Quiropraxia</option>
            <option value="Radiologia">Radiologia</option>
            <option value="Sexologia">Sexologia</option>
            <option value="Urologia">Urologia</option>
            <option value="Alergia e Imunologia">Alergia e Imunologia</option>
            <option value="Nutrologia">Nutrologia</option>
            <option value="Fisioterapia">Fisioterapia</option>
            <option value="Oftalmologia">Oftalmologia</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Psiquiatria">Psiquiatria</option>
            <option value="Psicologia">Psicologia</option>
            <option value="Patologia">Patologia</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Cirurgia Geral">Cirurgia Geral</option>
            <option value="Traumatologia">Traumatologia</option>
          </select>
          {errors.especialista && <span>Este campo é obrigatório</span>}
        </div>
        </StyledSelectWrapper>
        <FormInput
          type="text"
          register={register("motivoConsulta")}
          error={errors.motivoConsulta}
        >
          Motivo da Consulta
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
