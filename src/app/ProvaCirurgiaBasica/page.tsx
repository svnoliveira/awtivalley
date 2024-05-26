"use client";
import { Header } from "@/components/Header";
import { ProvaCirurgiaBasica } from "@/components/ProvaCirurgiaBasica";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeProvaCirurgiaBasica() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <ProvaCirurgiaBasica />
          </main>
        </>
      }
    </>
  );
}
