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
    const success = await registerUser({
      ...userData,
      licenca_medica: {
        ...userData.licenca_medica,
        crm: userData.licenca_medica.crm, // Inclui o CRM dentro de licenca_medica
      },
    });
    success && push("/login");
  };

  const checkError = () => {
    if (
      errors.confirmPassword ||
      errors.discord_id ||
      errors.nome ||
      errors.passaporte ||
      errors.senha ||
      errors.licenca_medica?.crm
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
        <Link href={"/DashboardIngresso"}>{"<"} Menu Ingressos</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        ></Image>
        <span>Cadastrar novo Colaborador</span>
        <div>
          <FormInput
            type="text"
            register={register("nome")}
            error={errors.nome}
          >
            Digite o Nome do Colaborador
          </FormInput>
          <FormInput
            type="text"
            register={register("passaporte")}
            error={errors.passaporte}
          >
            Digite o Passaporte do Colaborador
          </FormInput>
          <FormInput
            type="text"
            register={register("licenca_medica.crm")}
            error={errors.licenca_medica?.crm}
          >
            Digite o Registro Geral
          </FormInput>
          <FormInput
            type="text"
            register={register("discord_id")}
            error={errors.discord_id}
          >
            Digite o ID do Discord do Colaborador
          </FormInput>
          <FormInput
            type="password"
            register={register("senha")}
            error={errors.senha}
          >
            Digite a senha padrão
          </FormInput>
          <FormInput
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          >
            Confirme a senha padrão
          </FormInput>
        </div>
        <StyledSubmitButton $error={checkError()} type="submit">
          CADASTRAR
        </StyledSubmitButton>
      </StyledForm>
    </StyledSection>
  );
};
