"use client";
import { Header } from "@/components/Header";
import { IngressoPlanilha } from "@/components/IngressoPlanilha";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeIngressoPlanilha() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <IngressoPlanilha />
          </main>
        </>
      }
    </>
  );
}
