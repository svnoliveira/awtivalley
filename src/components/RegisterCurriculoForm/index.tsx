import React from 'react';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterCurriculoValues, registerCurriculoSchema } from "./schema";

export const RegisterCurriculoForm = () => {
  const { register, handleSubmit } = useForm<TRegisterCurriculoValues>({
    resolver: zodResolver(registerCurriculoSchema),
  });
  const router = useRouter();

  const onSubmit = (data: TRegisterCurriculoValues) => {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log(data); // Exemplo: imprimir os dados no console
    // Após o envio bem-sucedido, você pode redirecionar para outra página
    router.push("/outra-pagina");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("nome")} placeholder="Nome" required />
      <input type="text" {...register("passaporte")} placeholder="Passaporte" required />
      <input type="text" {...register("telefone", { pattern: /\d{3}-\d{3}/ })} placeholder="Telefone (###-###)" required />
      <input type="text" {...register("experiencia")} placeholder="Experiência" required />
      <input type="text" {...register("disponibilidadeEntrevista")} placeholder="Disponibilidade para entrevista" required />
      <input type="text" {...register("disponibilidadeTrabalho")} placeholder="Disponibilidade para trabalho" required />
      <input type="file" {...register("imagem")} accept="image/*" required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};
