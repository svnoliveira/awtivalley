"use client";
import { AgendaConsultaPscotecnicoForm } from "@/components/AgendaConsultaPscotecnicoForm";
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
            <AgendaConsultaPscotecnicoForm />
          </main>
        </>
      }
    </>
  );
}
