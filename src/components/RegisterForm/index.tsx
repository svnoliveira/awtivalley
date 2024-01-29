"use client";
import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterValues, registerSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";

export const RegisterForm = () => {
  const { registerUser } = userStore((store) => store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValues>({
    resolver: zodResolver(registerSchema),
  });
  const { push } = useRouter();

  const parseRegisterData = async (userData: TRegisterValues) => {
    const success = await registerUser({ ...userData, licenca_medica: {} });
    success && push("/login");
  };
  const checkError = () => {
    if (
      errors.confirmPassword ||
      errors.discord_id ||
      errors.nome ||
      errors.passaporte ||
      errors.senha
    ) {
      return true;
    }
    return false;
  };

  return (
    <StyledSection>
      <StyledForm
        onSubmit={handleSubmit((formData) => parseRegisterData(formData))}
      >
        <Link href={"/"}>{"<"} Home</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        ></Image>
        <span>Cadastrar novo colaborador</span>
        <div>
          <FormInput
            type="text"
            register={register("nome")}
            error={errors.nome}
          >
            Digite seu nome
          </FormInput>
          <FormInput
            type="text"
            register={register("passaporte")}
            error={errors.passaporte}
          >
            Digite seu Passaporte
          </FormInput>
          <FormInput
            type="text"
            register={register("discord_id")}
            error={errors.discord_id}
          >
            Digite o ID do seu Discord
          </FormInput>
          <FormInput
            type="password"
            register={register("senha")}
            error={errors.senha}
          >
            Digite sua senha
          </FormInput>
          <FormInput
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          >
            Confirme sua Senha
          </FormInput>
        </div>
        <StyledSubmitButton $error={checkError()} type="submit">
          CADASTRAR
        </StyledSubmitButton>
      </StyledForm>
    </StyledSection>
  );
};
