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
      case "username":
        return "Passaporte";
      case "password":
        return "Senha";

      default:
        return "to be determined";
    }
  };
  return (
    <StyledDiv>
      <label htmlFor={register.name}>{getLabelName()}</label>
      <input placeholder={String(children)} type={type} {...register}></input>
      {error && <p>{error.message}</p>}
      <Image
        src={
          register.name === "username" ? "/icons/person.svg" : "/icons/key.svg"
        }
        alt="person icon"
        width={25}
        height={25}
      />
    </StyledDiv>
  );
};
