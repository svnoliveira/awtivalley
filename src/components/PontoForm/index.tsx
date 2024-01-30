"use client";

import { registroStore } from "@/stores/registroDePonto";
import { useForm } from "react-hook-form";
import { TPontoValues, pontoSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../FormInput";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { StyledForm, StyledSection } from "./style";
import { StyledSubmitButton } from "@/globalStyles/SubmitButton";
import Image from "next/image";
import { formatHorario } from "@/utils/operations";
import { Loading } from "@/fragments/Loading";
import Link from "next/link";

export const PontoForm = () => {
  const { addPonto, loading } = registroStore((store) => store);
  const userId = userStore((store) => store.userData?.user.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TPontoValues>({
    resolver: zodResolver(pontoSchema),
  });

  const parsePontoData = async (formData: TPontoValues) => {
    const pontoData = {
      entrada: formatHorario(formData.entrada) || "",
      saida: formatHorario(formData.saida) || "",
      justificativa: formData.justificativa || "-",
    };
    await addPonto(pontoData, userId!);
  };

  useEffect(() => {
    reset({
      entrada: "",
      saida: "",
      justificativa: "",
    });
  }, [isSubmitSuccessful]);

  const checkError = () => {
    if (errors.entrada || errors.saida) {
      return true;
    }
    return false;
  };

  return (
    <StyledSection>
      <StyledForm
        onSubmit={handleSubmit((formData) => parsePontoData(formData))}
      >
        <Link href={"/"}>{"<"} Home</Link>
        <Image
          src="/cma-logo-black.png"
          alt="Logo awti valley"
          width={300}
          height={500}
        ></Image>
        <span>Registro de Ponto</span>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              <FormInput
                type="text"
                register={register("entrada")}
                error={errors.entrada}
              >
                Entrada
              </FormInput>
              <FormInput
                type="text"
                register={register("saida")}
                error={errors.entrada}
              >
                Saída
              </FormInput>
              <FormInput
                type="text"
                register={register("justificativa")}
                error={errors.justificativa}
              >
                Justificativa
              </FormInput>
            </div>
            <StyledSubmitButton $error={checkError()} type="submit">
              REGISTRAR PONTO
            </StyledSubmitButton>
          </>
        )}
      </StyledForm>
    </StyledSection>
  );
};
