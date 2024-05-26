"use client";
import { Header } from "@/components/Header";
import { ProvaElaboracaodeLaudos } from "@/components/ProvaElaboracaodeLaudos";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaElaboracaodeLaudos() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaElaboracaodeLaudos />
          </main>
        </>
      }
    </>
  );
}
