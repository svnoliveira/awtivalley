"use client";

import { AdminHeader } from "@/components/AdminHeader";
import { AdminNav } from "@/components/AdminNav";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { cursoStore } from "@/stores/cursoStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { loading, userData } = userStore((state) => state);
  const { loadEspecialidades } = especialidadeStore((state) => state);
  const { loadCursos } = cursoStore((state) => state);
  const { loadPontos } = registroStore((state) => state);
  if (!userData?.user.is_superuser) {
    redirect("/login");
  }
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadEspecialidades(), loadCursos(), loadPontos()]);
    };
    loadData();
  }, []);

  return (
    <main>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          <AdminHeader />
          <AdminNav />
        </>
      )}
    </main>
  );
}
