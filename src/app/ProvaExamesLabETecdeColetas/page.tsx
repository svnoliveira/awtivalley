"use client";
import { Header } from "@/components/Header";
import { ProvaExamesLabETecdeColetas } from "@/components/ProvaExamesLabETecdeColetas";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaExamesLabETecdeColetas() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaExamesLabETecdeColetas />
          </main>
        </>
      }
    </>
  );
}
