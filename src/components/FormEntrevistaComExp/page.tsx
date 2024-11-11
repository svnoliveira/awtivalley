"use client";
import { Header } from "@/components/Header";
import { FormEntrevistaComExp } from "@/components/FormEntrevistaComExp";
import { Loading } from "@/fragments/Loading";
import { GlobalStyle } from "@/globalStyles/globalstyle";
import { userStore } from "@/stores/userStore";

export default function HomeFormEntrevistaComExp() {
  const loading = userStore((state) => state.loading);
  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> :
        <>
          <Header />
          <main>
            <FormEntrevistaComExp />
          </main>
        </>
      }
    </>
  );
}
