import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { StyledDiv } from "./style";
import Image from "next/image";

interface IFormInputProps {
  children: React.ReactNode;
  type: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
}

export const FormInput = ({
  children,
  type,
  register,
  error,
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
      <input placeholder={String(children)} type={type} {...register}></input>
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
