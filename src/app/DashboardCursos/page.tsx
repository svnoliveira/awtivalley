"use client";
import { Header } from "@/components/Header";
import { DashboardCursos } from "@/components/DashboardCursos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function Home() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <DashboardCursos />
          </main>
        </>
      }
    </>
  );
}
