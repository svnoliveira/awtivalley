import React from 'react';
import { useRouter } from "next/router"; // Modificado de "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterCurriculoValues, registerCurriculoSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";

export const RegisterCurriculoForm = () => {
  const { register, handleSubmit } = useForm<TRegisterCurriculoValues>({
    resolver: zodResolver(registerCurriculoSchema),
  });
  const router = useRouter();

  const onSubmit = (data: TRegisterCurriculoValues) => {
    console.log(data);
    router.push('/outra-pagina');
  };

  return (
    <StyledSection>
      <Link href="/">Voltar</Link>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("nome")} placeholder="Nome" required />
        <input type="text" {...register("passaporte")} placeholder="Passaporte" required />
        <input type="text" {...register("telefone", { pattern: /\d{3}-\d{3}/ })} placeholder="Telefone (###-###)" required />
        <input type="text" {...register("experiencia")} placeholder="Experiência" required list="experienciaOptions" />
        <input type="text" {...register("disponibilidadeEntrevista")} placeholder="Disponibilidade para entrevista" required />
        <input type="text" {...register("disponibilidadeTrabalho")} placeholder="Disponibilidade para trabalho" required />
        <input type="file" {...register("imagem")} accept="image/*" required />
        <button type="submit">Cadastrar</button> {/* Usando um botão padrão */}
      </StyledForm>
    </StyledSection>
  );
};

