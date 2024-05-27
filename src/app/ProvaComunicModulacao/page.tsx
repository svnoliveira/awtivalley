"use client";
import { Header } from "@/components/Header";
import { ProvaComunicModulacao } from "@/components/ProvaComunicModulacao";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaComunicModulacaos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaComunicModulacao />
          </main>
        </>
      }
    </>
  );
}
