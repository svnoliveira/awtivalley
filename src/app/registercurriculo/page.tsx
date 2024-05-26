"use client";
import { RegisterCurriculoForm } from "@/components/RegisterCurriculoForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { Loading } from "@/fragments/Loading";
import { userStore } from "@/stores/userStore";

export default function RegisterPage() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <main>
            <RegisterCurriculoForm />
          </main>
        </>
      }
    </>
  );
}
