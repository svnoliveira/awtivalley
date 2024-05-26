"use client";
import { Header } from "@/components/Header";
import { ProvaAnatomiaBasica } from "@/components/ProvaAnatomiaBasica";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaAnatomiaBasica() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaAnatomiaBasica />
          </main>
        </>
      }
    </>
  );
}
