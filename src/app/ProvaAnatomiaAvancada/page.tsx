"use client";
import { Header } from "@/components/Header";
import { ProvaAnatomiaAvancada } from "@/components/ProvaAnatomiaAvancada";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaAnatomiaAvancada() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaAnatomiaAvancada />
          </main>
        </>
      }
    </>
  );
}
