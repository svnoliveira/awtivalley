"use client";

import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginValues, loginSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection } from "./style";
import Image from "next/image";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";

export const LoginForm = () => {
  const { loginUser } = userStore((store) => store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>({
    resolver: zodResolver(loginSchema),
  });
  const { push } = useRouter();

  const parseLoginData = async (userData: TLoginValues) => {
    const success = await loginUser(userData);
    success && push("/dashboard");
  };

  return (
    <StyledSection>
      <StyledForm
        onSubmit={handleSubmit((formData) => parseLoginData(formData))}
      >
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        ></Image>
        <span>Entrar na sua conta</span>
        <div>
          <FormInput
            type="text"
            register={register("username")}
            error={errors.username}
          >
            Digite seu Passaporte
          </FormInput>
          <FormInput
            type="password"
            register={register("password")}
            error={errors.password}
          >
            Digite sua senha
          </FormInput>
        </div>
        <StyledSubmitButton
          $error={errors.password ? true : errors.username ? true : false}
          type="submit"
        >
          Entrar
        </StyledSubmitButton>
      </StyledForm>
    </StyledSection>
  );
};
