"use client";

import { AdminHeader } from "@/components/AdminHeader";
import { AdminNav } from "@/components/AdminNav";
import { Header } from "@/components/Header";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { cursoStore } from "@/stores/cursoStore";
import { exameStore } from "@/stores/exameStore";
import { especialidadeStore } from "@/stores/especialidadeStore";
import { registroStore } from "@/stores/registroDePonto";
import { userStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { loading, userData } = userStore((state) => state);
  const { loadEspecialidades } = especialidadeStore((state) => state);
  const { loadCursos } = cursoStore((state) => state);
  const { loadExames } = exameStore((state) => state);
  const { loadPontos } = registroStore((state) => state);
  const loadUser = userStore((state) => state.loadUser);

  useEffect(() => {
    const loadData = async () => {

      await loadUser();
      if (!userData?.user.is_superuser) {
        redirect("/login");
      }
      await Promise.all([loadEspecialidades(), loadCursos(), loadExames(), loadPontos()]);
    };
    loadData();
  }, [loadUser, loadCursos, loadEspecialidades, loadExames, loadPontos]);

  return (
    <>
      <GlobalStyle />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <main>
          <AdminHeader />
          <AdminNav />
        </main>
      )}
    </>
  );
}
