import React from 'react';
import { UseFormRegisterReturn } from "react-hook-form";
import { StyledDiv } from "./style";
import Image from "next/image";

interface IFormInputProps {
  children: React.ReactNode;
  type: string;
  error: any; // Alterando a tipagem do error para aceitar qualquer tipo
  register: UseFormRegisterReturn<string>;
  defaultValue?: string; // Adicionando a propriedade defaultValue
  disabled?: boolean; // Adicionando a propriedade disabled
}

export const FormInput = ({
  children,
  type,
  error,
  register,
  defaultValue, // Adicionando a propriedade defaultValue
  disabled, // Adicionando a propriedade disabled
}: IFormInputProps) => {
  const getLabelName = () => {
    switch (register.name) {
      case "nome":
        return "Nome";
      case "username":
        return "Passaporte";
      case "passaporte":
        return "Passaporte";
      case "password":
        return "Senha";
      case "senha":
        return "Senha";
      case "discord_id":
        return "ID do Discord";
      case "confirmPassword":
        return "Confirmação de senha";
      case "entrada":
        return "Entrada";
      case "saida":
        return "Saída";
      case "justificativa":
        return "Justificativa";
      case "cargo":
        return "Cargo";
      case "setor":
        return "Setor";
      case "efetivacao":
        return "Data de Efetivação";
      case "funcao":
        return "Função";
      case "funcoes_extra":
        return "Funções extra";
      case "ultima_promocao":
        return "Última promoção";
      case "observacoes":
        return "Observações";
      case "hab_aereo":
        return "Habilitação Aéreo";
      case "ciclo":
        return "Licença médica: ciclo";
      case "data":
        return "Licença médica: data de expedição";
      case "responsavel":
        return "Licença médica: responsável";
      case "crm":
        return "CRM (Registro Geral)";
      case "telefone":
        return "Telefone (###-###)";
      case "experiencia":
        return "Experiência";
      case "disponibilidadeEntrevista":
        return "Disponibilidade para entrevista";
      case "disponibilidadeTrabalho":
        return "Disponibilidade para trabalho";
      case "especialista":
        return "Consulta para o Especialista";
      case "motivoConsulta":
        return "Motivo da Consulta";
      case "disponibilidadeConsulta":
        return "Disponibilidade para se consultar";
      case "RegGeral":
        return "Registro Geral";
      case "Local":
        return "Localização";
      case "Hora":  
        return "Horário do Chamado";  
      case "licenca_medica.crm":
        return "Registro Geral";        
      default:
        return "to be determined";
    }
  };

  const getIconUrl = () => {
    switch (register.name) {
      case "nome":
        return "/icons/person.svg";
      case "username":
        return "/icons/person.svg";
      case "passaporte":
        return "/icons/person.svg";
      case "password":
        return "/icons/key.svg";
      case "senha":
        return "/icons/key.svg";
      case "discord_id":
        return "/icons/discord.svg";
      case "confirmPassword":
        return "/icons/key.svg";
      default:
        return "/icons/ponto.svg";
    }
  };

  return (
    <StyledDiv>
      <label htmlFor={register.name}>{getLabelName()}</label>
      <input 
        placeholder={String(children)} 
        type={type} 
        {...register} 
        defaultValue={defaultValue} // Incluindo defaultValue no input
        disabled={disabled} // Incluindo disabled no input
      />
      {error && <p>{error.message}</p>}
      <Image
        src={getIconUrl()}
        alt="person icon"
        width={25}
        height={25}
      />
    </StyledDiv>
  );
};
