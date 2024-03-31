"use client";
import { AgendaConsultaForm } from "@/components/AgendaConsultaForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";

export default function AgendaConsultaPage() {
  return (
    <>
      <GlobalStyle />
      : (
        <>
          <main>
            <AgendaConsultaForm />
          </main>
        </>
      )
    </>
  );
}
