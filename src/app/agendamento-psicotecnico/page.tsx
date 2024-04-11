"use client";
import { AgendaConsultaPscotecnicoForm } from "@/components/AgendaConsultaPscotecnicoForm";
import { GlobalStyle } from "@/globalStyles/globalstyle";

export default function AgendaConsultaPage() {
  return (
    <>
      <GlobalStyle />
      : (
        <>
          <main>
            <AgendaConsultaPscotecnicoForm />
          </main>
        </>
      )
    </>
  );
}
