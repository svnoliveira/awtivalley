"use client";
import { RegisterForm } from "@/components/RegisterForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserRole } from "@/utils/operations";
import { redirect } from "next/navigation";

export default function RegisterCurriculoForm() {
  return (
    <>
      <GlobalStyle />
        <>
          <main>
            <RegisterCurriculoForm />
          </main>
        </>
    </>
  );
}
