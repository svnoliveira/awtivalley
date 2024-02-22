"use client";
import { PontoForm } from "@/components/PontoForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function PontoPage() {
  const { loading, userData } = userStore((state) => state);
  const { loadPontos } = registroStore((state) => state)
  if (!userData) {
    redirect("/login");
  }

  useEffect(() => {
    const loadList = () => {
      if (userData) {
        loadPontos();
      }
    };
    loadList();
  }, []);

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>
            <PontoForm />
          </main>
        </>
      )}
    </>
  );
}
