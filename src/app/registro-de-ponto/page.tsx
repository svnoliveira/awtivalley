"use client";
import { PontoForm } from "@/components/PontoForm";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function PontoPage() {
  const { loading, userData, loadUser } = userStore((state) => state);
  const { loadPontos } = registroStore((state) => state)
  

  useEffect(() => {
    const loadList = async () => {
      await loadUser();

      if (userData) {
        await loadPontos();
      } else {
        redirect("/login");
      }
    };
    loadList();
  }, [loadUser, loadPontos]);

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
