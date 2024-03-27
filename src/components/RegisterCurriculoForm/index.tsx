"use client";
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
 
  const {
    register,
    handleSubmit,

  } = useForm<TRegisterCurriculoValues>({
    resolver: zodResolver(registerCurriculoSchema),
  });
  const { push } = useRouter();

  return (
    <StyledSection>
          CADASTRARasdas
    </StyledSection>
  );
};
