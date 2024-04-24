"use client";
import { RegisterCurriculoForm } from "@/components/RegisterCurriculoForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";

export default function RegisterPage() {


  return (
    <>
      <GlobalStyle />
      : (
        <>
          <main>
            <RegisterCurriculoForm />
          </main>
        </>
      )
    </>
  );
}
