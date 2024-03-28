"use client";
import { AgendaConsultaForm } from "@/components/AgendaConsultaForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";
import { checkUserRole } from "@/utils/operations";
import { redirect } from "next/navigation";

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
