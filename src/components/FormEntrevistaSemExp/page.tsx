"use client";
import { Header } from "@/components/Header";
import { FormEntrevistaSemExp } from "@/components/FormEntrevistaSemExp";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeFormEntrevistaSemExp() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <FormEntrevistaSemExp />
          </main>
        </>
      }
    </>
  );
}
