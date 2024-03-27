import { useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterCurriculoValues, registerCurriculoSchema } from "./schema";
import { FormInput } from "../FormInput";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import Link from "next/link";

export const RegisterCurriculoForm = () => {
  const { registerUser } = userStore((store) => store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterCurriculoValues>({
    resolver: zodResolver(registerCurriculoSchema),
  });

  const router = useRouter();

  const onSubmit = (data: TRegisterCurriculoValues) => {
    console.log(data);
    router.push('/dashboard');
  };

  const checkError = () => {
    if (
      errors.nome ||
      errors.passaporte ||
      errors.telefone ||
      errors.experiencia ||
      errors.disponibilidadeEntrevista ||
      errors.disponibilidadeTrabalho ||
      errors.imagem
    ) {
      return true;
    }
    return false;
  };

  return (
    <StyledSection>
      <Link href="/">Voltar</Link>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          register={register("nome")}
          error={errors.nome}
        >
          Nome
        </FormInput>
        <FormInput
          type="text"
          register={register("passaporte")}
          error={errors.passaporte}
        >
          Passaporte
        </FormInput>
        <FormInput
          type="text"
          register={register("telefone", { pattern: /\d{3}-\d{3}/ })}
          error={errors.telefone}
        >
          Telefone (###-###)
        </FormInput>
        <FormInput
          type="text"
          register={register("experiencia")}
          error={errors.experiencia}
        >
          Experiência
        </FormInput>
        <FormInput
          type="text"
          register={register("disponibilidadeEntrevista")}
          error={errors.disponibilidadeEntrevista}
        >
          Disponibilidade para entrevista
        </FormInput>
        <FormInput
          type="text"
          register={register("disponibilidadeTrabalho")}
          error={errors.disponibilidadeTrabalho}
        >
          Disponibilidade para trabalho
        </FormInput>
        <FormInput
          type="file"
          register={register("imagem")}
          error={errors.imagem}
        >
          Imagem
        </FormInput>
        <StyledSubmitButton $error={checkError()} type="submit">
          Cadastrar
        </StyledSubmitButton>
      </StyledForm>
    </StyledSection>
  );
};
