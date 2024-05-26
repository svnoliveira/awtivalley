"use client";
import { AgendaConsultaForm } from "@/components/AgendaConsultaForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { Loading } from "@/fragments/Loading";
import { userStore } from "@/stores/userStore";

export default function AgendaConsultaPage() {
  const loading = userStore((state) => state.loading);
  
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> : 
        <>
          <main>
            <AgendaConsultaForm />
          </main>
        </>
      }
    </>
  );
}
